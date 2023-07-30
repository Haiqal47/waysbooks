import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Map from "../../assest/img/map.png";
import Call from "../../assest/img/call.png";
import Email from "../../assest/img/email.png";
import Gender from "../../assest/img/gender.png";
import Profile from "../../assest/img/profile2.png";
import Buku1 from "../../assest/img/buku1.png";

function ShowProfile() {
  return (
    <div>
      <Container>
        <div className="mx-5 px-5 mt-4">
          <div className="mb-5">
            <h1 style={{ fontFamily: "Times" }}>Profile</h1>
            <div style={{ backgroundColor: "#FFD9D9" }} className="rounded-3">
              <Row xl={12} className="p-5">
                <Col xl={8}>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img src={Email} alt="email" />
                    </div>
                    <div>
                      <h6>email@gmail.com</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Email
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center my-3">
                    <div className="me-3">
                      <img src={Gender} alt="gender" />
                    </div>
                    <div>
                      <h6>email@gmail.com</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Email
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-3">
                      <img src={Call} alt="call" />
                    </div>
                    <div>
                      <h6>email@gmail.com</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Email
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="me-3 pe-1">
                      <img src={Map} alt="map" />
                    </div>
                    <div>
                      <h6>email@gmail.com</h6>
                      <h6
                        className="text-body-secondary"
                        style={{ fontSize: "13px" }}
                      >
                        Email
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col xl={4}>
                  <img
                    style={{ width: "100%" }}
                    src={Profile}
                    alt="profile"
                    className="rounded-3 mb-3"
                  />
                  <Button style={{ width: "100%" }} variant="danger ">
                    Edit Profile
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h1 style={{ fontFamily: "Times" }}>My Books</h1>
            <div style={{ width: "200px" }} className="my-4">
              <img
                style={{ width: "100%" }}
                src={Buku1}
                alt="buku1"
                className="rounded-3 mb-3"
              />
              <h3 style={{ fontFamily: "Times" }}>My Own Private Mr. Col</h3>
              <p className="text-body-secondary fst-italic">By. Indah Hanaco</p>
              <Button variant="dark" style={{ width: "100%" }}>
                Download
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ShowProfile;
