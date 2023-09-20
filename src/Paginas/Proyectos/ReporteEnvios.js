// ProyectosAdmin.js

import React, { useState, useEffect } from "react";
import Nabvar from "../../Componentes/Nabvar";
import swal from "sweetalert";
import { Link} from "react-router-dom";
import APIInvoke from "../../utils/APIInvoke"; 
import SidebarContainer from "../../Componentes/SidebarContainer";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";


const ProyectosAdmin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const response = await APIInvoke.invokeGET("/Envios");
      setProductos(response);
  }
  useEffect(()=>{
    obtenerProductos();
  },[])

  const Eliminarproducto = async (e,id) => {
    e.preventDefault();
  const response = await APIInvoke.invokeDELETE(`/Envios/${id}`);
  if (response) { 
    const msg = "Producto eliminado correctamente";
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
    obtenerProductos();
  }else{
    const msg = " el Producto no eliminado correctamente";
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
}

  const handleEntrega = (productoId) => {

    swal({
      title: "Producto Entregado",
      text: "El producto ha sido entregado con éxito.",
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
    
  };

  return (
    <div className="wrapper">
      <Nabvar></Nabvar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          Titulo={"Listado de Productos Tipicos"}
          breadcrumb1={"inicio"}
          breadcrumb2={"Productos"}
          ruta1={"/home"}
        />
        <section className="content">
          <div className="card">
            <div className="card-body">
              <table className="table table-head-fixed text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Región</th>
                    <th>direccionEnvio</th>
                    <th>ciudadEnvio</th>
                    <th>Entrega</th>

                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.region}</td>
                      <td>{producto.direccionEnvio}</td>
                      <td>{producto.ciudadEnvio}</td>
                      <td>
                      <button onClick={(e)=> Eliminarproducto(e,producto.id )} className="btn btn-sm btn-danger">Eliminar</button>&nbsp;&nbsp;
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleEntrega(producto.id)}
                        >
                          Entregar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProyectosAdmin;
