// Copyright limyifan1 <limyifan1@gmail.com> 2020. All Rights Reserved.
// Node module: hawkercentral
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import React from "react";
import "../App.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import Component from "../Components";
import Helpers from "../Helpers/helpers";

import { withRouter } from "react-router-dom";

const sendDeleteEmail = async(docid, originalName) => {
  await Helpers.sendEmailToUpdateListing(docid, originalName, "delete", {})
    .then((result) => {
      console.log(result);
    })
    .catch(function (error) {
      console.error("Error sending email: ", error);
    });
};

export class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditModal: false,
      showDeleteModal: false,
      isDeleting: false,
    };
  }

  setShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  setHideEditModal = () => {
    this.setState({ showEditModal: false });
  };

  handleSubmitEdit = (hasEdit) => {
    this.setHideEditModal();

    if (hasEdit) {
      this.props.onSubmitEdit();
    }
  }

  setShowDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  setHideDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  handleSubmitDelete = async () => {
    this.setState({ isDeleting: true });
    await sendDeleteEmail(this.props.id, this.props.data.name)
      .then(() => {
        this.setHideDeleteModal();
        this.setState({ isDeleting: false });
        this.props.onSubmitDelete();
      });
  }

  render() {
    return (
      <span>
        <div
          class="row"
          style={{ backgroundColor: "", position: "relative", left: "20px" }}
        >
          <div
            onClick={() => this.setShowDeleteModal()}
            class="d-flex justify-content-center"
            style={{
              border: "2px solid",
              "border-color": "grey",
              color: "black",
              width: "60px",
              alignText: "center",
              fontSize: "12px",
              cursor: "pointer",
              marginTop: "12px",
              marginRight: "12px",
            }}
          >
            Delete
          </div>
          <div
            onClick={() => this.setShowEditModal()}
            class="d-flex justify-content-center"
            style={{
              border: "2px solid",
              "border-color": "grey",
              color: "black",
              width: "60px",
              alignText: "center",
              fontSize: "12px",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            Edit
          </div>

          {this.props.data.lastmodified ? (
            <span
              class="align-items-center col"
              style={{ postition: "absolute", marginTop: "10px" }}
            >
              <small style={{ color: "grey" }}>
                {" "}
                Last Modified:{" "}
                {new Date(this.props.data.lastmodified.toDate()).toDateString()}
              </small>
            </span>
          ) : null}
        </div>
        <Modal
          onHide={this.setHideEditModal}
          show={this.state.showEditModal}
          dialogClassName="modal-dialog modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ "margin-top": "50px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Edit Hawker Listing
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Component.ListForm
              toggle="edit"
              id={this.props.id}
              data={this.props.data}
              onSubmitEdit={this.handleSubmitEdit}
            />
          </Modal.Body>
        </Modal>
        <Modal
          onHide={this.setHideDeleteModal}
          show={this.state.showDeleteModal}
          dialogClassName="modal-dialog modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          style={{ "margin-top": "50px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Delete Hawker Listing
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this hawker listing?</p>
            <Button
              class="shadow-sm"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#b48300",
                float: "right",
                marginLeft: "12px",
              }}
              onClick={this.setHideDeleteModal}
              disabled={this.state.isDeleting}
            >
              <p style={{ 
                margin: "0rem",
                color: "black", 
              }}>No</p>
            </Button>
            <Button
              class="shadow-sm"
              style={{
                backgroundColor: "#b48300",
                borderColor: "#b48300",
                float: "right",
              }}
              onClick={this.handleSubmitDelete}
              disabled={this.state.isDeleting}
            >
              { this.state.isDeleting 
              ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              : <p style={{ margin: "0rem" }}>Yes</p> }
            </Button>
          </Modal.Body>
        </Modal>
      </span>
    );
  }
}

export default withRouter(Popup);
