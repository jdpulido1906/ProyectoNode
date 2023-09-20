import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";

const Login = () => {
  //Pa redireccionar un componente a otro
  const navigate = useNavigate();
  // Definimos el estado Inicial de las Variables 
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.getElementById("email").focus();
  }, []);

  const iniciarSeasion = async () => {
    if (password.length < 6) {
      const msg = "La constraseña debe ser al menos de 6 caracteres.";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    } else {
      const data = {
        email: usuario.email,
        password: usuario.password,
      }
      const response = await APIInvoke.invokePOST(`/Usuarios`, data);
      const mensaje = response;
        if (mensaje === "El usuario no existe" || mensaje === "Contraseña Incorrecta") {
          const msg = "No fue posible iniciar Sesión. Verifique los Datos Ingresados.";
          swal({
            title: "Error",
            text: msg,
            icon: "error",
            buttons: {
              confirm: {
                text: "Ok",
                value: true,
                visible: true,
                className: "btn btn-danger",
                closeModal: true,
              },
            },
          });
        }else{
          // obtenemos el token de acceso
          const jwt = response.token;
          // guardamos el token en el localstorage
          localStorage.setItem("token",jwt);
          // redireccionamos al home la pagina Principal
          navigate("/home");
        }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSeasion();
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={"#"}>
            <b>Iniciar</b>Sesión
          </Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Bienvenido, ingrese sus credenciales</p>

            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button className="btn btn-block btn-primary" type="submit">
                  Ingresar
                </button>
                <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                  Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
