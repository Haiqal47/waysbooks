import React, { useEffect, useState } from "react";
import Buku1 from "../../assest/img/buku1.png";
import Trash from "../../assest/img/trash.png";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Pay from "../../assest/img/pay.png";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/Api";
import { Modal } from "react-bootstrap";

function ShowCart() {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [open3, setOpen3] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    console.log("delete id", deleteId);
    setOpen3(true);
  };

  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/transaction/${id}`);
      console.log(response);
      refetch();
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  });

  // const Total = "";

  // const hitungTotal = useMutation(async(id) => {
  //   for (let i = 0; i < id; i++){

  //   }
  // })

  const handleDeleteId = () => {
    setDeleteConfirm(true);
  };

  useEffect(() => {
    if (deleteConfirm) {
      deleteById.mutate(deleteId);
      setDeleteConfirm(null);
      setOpen3(false);
    }
  }, [deleteConfirm]);

  // let param = useParams();
  // let id = parseInt(param.id);

  // console.log("ini id: ", id);

  let { data: myBooks, refetch } = useQuery("myBooksCache2", async () => {
    const response = await API.get(`/transactionuser`);
    console.log("ini coba response my books user : ", response);
    console.log(response.data.data.transaction);
    return response.data.data.transaction;
  });

  const totalPrice = myBooks
    ? myBooks.reduce(
        (accumulator, currentValue) =>
          accumulator + parseFloat(currentValue.booksPurchased.price),
        0
      )
    : 0;
  // const totalQty = myBooks
  //   ? myBooks.reduce(
  //       (accumulator, currentValue) =>
  //         accumulator + parseFloat(currentValue.),
  //       0
  //     )
  //   : 0;

  let ID = myBooks;
  console.log(ID);

  return (
    <div>
      <Container style={{ marginTop: "130px" }}>
        <Row xl={12}>
          <Col xs={8}>
            <h1 style={{ fontFamily: "Times" }}>My Cart</h1>
            <h4>Review Your Order</h4>
            <div className="mt-4 pt-4 border-top border-bottom border-black">
              {myBooks?.map((data) => {
                return (
                  <div className="d-flex pb-4 justify-content-between">
                    <div className="d-flex">
                      <img
                        style={{ width: "150px" }}
                        src={data.booksPurchased.thumbnail}
                        alt="buku1"
                        className="me-3"
                      />
                      <div>
                        <h3 style={{ fontFamily: "Times" }}>
                          {data.booksPurchased.title}
                        </h3>
                        <p className="text-body-secondary fst-italic">
                          {data.booksPurchased.author}
                        </p>
                        <h5 className="text-success">
                          {data.booksPurchased.price}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <img
                        onClick={() => handleDelete(data.id)}
                        style={{ cursor: "pointer" }}
                        src={Trash}
                        alt="trash"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col xs={4}>
            <br />
            <br />
            <br />
            <br />
            <div className="border-top border-bottom border-black mt-3 pt-3 mb-3">
              <div className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p>Rp. {totalPrice}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p>Qty</p>
                <p>2</p>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <p>Total</p>
                <p className="text-success ">Rp. 150.000</p>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <img style={{ width: "50%" }} src={Pay} alt="pay" />
            </div>
            <div className="d-flex justify-content-end">
              <Button style={{ width: "50%" }} variant="dark">
                Pay
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      {open3 && (
        <Modal show={open3}>
          <Modal.Body>
            <div>
              <div>Delete Transaction</div>
              <div>Are you sure to delete this Transaction?</div>
              <div>
                <Button onClick={handleDeleteId}>Yes, Delete</Button>
                <Button onClick={() => setOpen3(false)}>No</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default ShowCart;
