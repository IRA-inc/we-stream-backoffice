import React, { useState } from "react";
import { Container, Row, Col, Collapse, Button, Modal } from "react-bootstrap";
// import  Card from '../../components/Card'

const ActionModal = (props) => {
  const { show, title, toggleModal, Component, isModal, formData } = props;
  console.log("ismal--->", isModal);
  return (
    <>
      <Modal show={show} onHide={toggleModal} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "#222222" }}>
          <Modal.Title as="h5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#222222" }}>
          <div>
            <Component toggleModal={toggleModal} isModal={isModal}  formData={formData} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActionModal;
