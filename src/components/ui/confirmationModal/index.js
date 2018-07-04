import React from "react";
import RPT from "prop-types";
import Modal from "react-modal";
import styles from "./style.sass";

import Button from "../../elements/button";

export default class ConfirmationModal extends React.Component {
  static propTypes = {
    onConfirm: RPT.func,
    children: RPT.func.isRequired,
    text: RPT.node
  };

  state = {
    isModalOpen: false
  };

  showModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen } = this.state;
    const { onConfirm, text, children } = this.props;

    const regularMarkup = children({
      open: this.showModal,
      close: this.closeModal
    });
    const modalMarkup = (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={this.closeModal}
        contentLabel="Example Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.content}>{text}</div>
        <div className={styles.buttons}>
          <Button className={styles.button} onClick={this.closeModal}>
            {"No"}
          </Button>
          <Button
            className={styles.button}
            style={"danger"}
            onClick={onConfirm}
          >
            {"Yes"}
          </Button>
        </div>
      </Modal>
    );
    return (
      <div>
        {regularMarkup}
        {modalMarkup}
      </div>
    );
  }
}
