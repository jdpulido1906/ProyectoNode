import React, { useState, useEffect } from "react";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import SidebarContainer from "../../Componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Nabvar from "../../Componentes/Nabvar";

const ProductosEnvios = () => {
  const navigate = useNavigate();
  const { idproducto } = useParams();
  let arreglo = idproducto.split("@");
  const idProducto = arreglo[0];
  const nombre = arreglo[1];
  const precio = arreglo[2];
  const categoria = arreglo[3];
  const region = arreglo[4];

  const [producto, setProducto] = useState({
    id: idProducto,
    nombre: nombre,
    precio: precio,
    categoria: categoria,
    region: region,
    direccionEnvio: "",
    ciudadEnvio: "",
  });

  useEffect(() => {
    document.getElementById("nombre").focus();
  }, []);

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const enviarProducto = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const data = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      region: producto.region,
      direccionEnvio: producto.direccionEnvio,
      ciudadEnvio: producto.ciudadEnvio,
    };

    // Hacer la solicitud POST a la API
    const response = await APIInvoke.invokePOST("/Envios", data);

    if (response.id !== "") {
      navigate("/proyectos-admin");
      const msg = "El Producto fue enviado correctamente";
      swal({
        title: "Información",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });

      // Limpiar el formulario después de enviarlo exitosamente
      setProducto({
        id: "",
        nombre: "",
        precio: "",
        categoria: "",
        region: "",
        direccionEnvio: "",
        ciudadEnvio: "",
      });
    } else {
      const msg = "El Producto no se pudo enviar correctamente";
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
    }
  };

  return (
    <div className="wrapper">
      <Nabvar />
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          Titulo={"Envío de Productos"}
          breadcrumb1={"Lista de Productos"}
          breadcrumb2={"Envío"}
          ruta1={"/proyectos-admin"}
        />
        <section className="content">
          <div className="card-header">
            <h3 className="card-title">
              <Link
                to="/proyectos-admin"
                type="button"
                className="btn btn-block btn-primary btn-sm"
              >
                Volver a la Lista
              </Link>
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={enviarProducto}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="id">ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    placeholder="Ingrese el ID del producto"
                    value={producto.id}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Ingrese el Nombre del producto"
                    value={producto.nombre}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="precio">Precio:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    name="precio"
                    placeholder="Ingrese el Precio del producto"
                    value={producto.precio}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="categoria">Categoría:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoria"
                    name="categoria"
                    placeholder="Ingrese la Categoría del producto"
                    value={producto.categoria}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="region">Región:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="region"
                    name="region"
                    placeholder="Ingrese la Región del producto"
                    value={producto.region}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="direccionEnvio">Dirección de Envío:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccionEnvio"
                    name="direccionEnvio"
                    placeholder="Ingrese la dirección de envío"
                    value={producto.direccionEnvio}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ciudadEnvio">Ciudad de Envío:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ciudadEnvio"
                    name="ciudadEnvio"
                    placeholder="Ingrese la ciudad de envío"
                    value={producto.ciudadEnvio}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductosEnvios;
