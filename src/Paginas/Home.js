import React from "react";
import Nabvar from "../Componentes/Nabvar";
import SidebarContainer from "../Componentes/SidebarContainer";
import ContentHeader from "../Componentes/ContentHeader";
import Footer from "../Componentes/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="wrapper">
      <Nabvar></Nabvar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Dashboard"}
          breadcrumb1={"Inicio"}
          breadcrumb2={"Dashboard"}
          ruta1={"/home"}
        />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Dulces</h3>
                    <p>&nbsp;&nbsp;</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-candy-cane" />
                  </div>
                  <Link to={"/proyectos-admin"} className="small-box-footer">
                    Ver Dulces <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>Envios</h3>
                    <p>&nbsp;&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas fas fa-dolly" />
                  </div>
                  <Link to={"/Reporte/envios"} className="small-box-footer">
                    Ver Envios <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
