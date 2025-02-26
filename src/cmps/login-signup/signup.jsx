import * as React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useFormik } from "formik"
import * as yup from "yup"
import { onSignup } from "../../store/user/user.actions"

export function SignUp({ setIsLogin }) {

    const theme = createTheme()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate('/')
    }, [user])

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            firstName: yup.string()
                .max(15, "Must be 15 characters or less. Please try again.")
                .required("Required"),
            lastName: yup.string()
                .max(20, "Must be 20 characters or less. Please try again."),
            username: yup.string()
                .max(15, "Must be 15 characters or less. Please try again.")
                .required("Required"),
            email: yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: yup.string()
                .required('No password provided')
                .min(6, 'Your password must be at least 6 characters long. Please try another.')
        }),
        onSubmit: (values) => {
            dispatch(onSignup(values))
        }
    })

    const handleFocus = ev => {
        ev.target.classList.add("focus")
    }

    const onBlur = (ev, inputName) => {
        if (formik.values[inputName]) return
        ev.target.classList.remove("focus")
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={formik.handleChange}
                                    onFocus={handleFocus}
                                    onBlur={formik.handleBlur}
                                    onBlurCapture={(ev) => { onBlur(ev, 'firstName') }}
                                    value={formik.values.firstName}
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <span className="error">{formik.errors.firstName}</span>
                                ) : <span>&nbsp;</span>}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    onFocus={handleFocus}
                                    onBlur={formik.handleBlur}
                                    onBlurCapture={(ev) => { onBlur(ev, 'lastName') }}
                                    value={formik.values.lastName}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <span className="error">{formik.errors.lastName}</span>
                                ) : <span>&nbsp;</span>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    name="username"
                                    onChange={formik.handleChange}
                                    onFocus={handleFocus}
                                    onBlur={formik.handleBlur}
                                    onBlurCapture={(ev) => { onBlur(ev, 'username') }}
                                    value={formik.values.username}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <span className="error">{formik.errors.username}</span>
                                ) : <span>&nbsp;</span>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={formik.handleChange}
                                    onFocus={handleFocus}
                                    onBlur={formik.handleBlur}
                                    onBlurCapture={(ev) => { onBlur(ev, 'email') }}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <span className="error">{formik.errors.email}</span>
                                ) : <span>&nbsp;</span>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={formik.handleChange}
                                    onFocus={handleFocus}
                                    onBlur={formik.handleBlur}
                                    onBlurCapture={(ev) => { onBlur(ev, 'password') }}
                                    value={formik.values.password}
                                    autoComplete="new-password" />
                                {formik.touched.password && formik.errors.password ? (
                                    <span className="error">{formik.errors.password}</span>
                                ) : <span>&nbsp;</span>}
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>

                        <Grid container justifyContent="flex-end" style={{ justifyContent: 'center' }}>
                            <Grid item>
                                <button onClick={() => setIsLogin(true)} variant="body2" className="link-btn">
                                    Already have an account? Sign in
                                </button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        Rello
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </ThemeProvider>
    )
}