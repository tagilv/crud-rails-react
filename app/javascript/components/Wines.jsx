import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddWineModal from "./AddWineModal.jsx";

class Wines extends React.Component {
  columns = [
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm title="Are you sure to delete this wine?" onConfirm={() => this.deleteWine(record.id)} okText="Yes" cancelText="No">
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  state = {
    beers: [],
  };

  componentDidMount() {
    this.loadWines();
  }

  loadWines = () => {
    const url = "api/v1/wines/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((wine) => {
          const newEl = {
            key: wine.id,
            id: wine.id,
            brand: wine.brand,
            style: wine.style,
            country: wine.country,
            quantity: wine.quantity,
          };

          this.setState((prevState) => ({
            wine: [...prevState.wines, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadWines = () => {
    this.setState({ wines: [] });
    this.loadWines();
  };

  deleteWine = (id) => {
    const url = `api/v1/wines/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadWines();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Table className="table-striped-rows" dataSource={this.state.wines} columns={this.columns} pagination={{ pageSize: 5 }} />

        <AddWineModal reloadWines={this.reloadWines} />
      </>
    );
  }
}

export default Wines;
