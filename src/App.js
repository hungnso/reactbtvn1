import React from "react";
import "./App.css";
import AddForm from "./components/AddForm";
import List from "./components/List";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      id: "",
      content: "",
      images: "",
      data: [],
      cmt: [],
    };
  }

  onAdd = () => {
    this.setState({
      show: true,
    });
  };
  hideForm = () => {
    this.setState({
      show: false,
      id: "",
      content: "",
    });
  };
  onSave = (id, content, images) => {
    const { data } = this.state;
    if (id) {
      const index = data.findIndex((item) => item.id === id);
      if (index > -1) {
        data[index] = { ...data[index], content: content, images: images };
      }
    } else {
      data.push({
        id: new Date().getTime(),
        content: content,
        images: images,
      });
    }

    this.setState({ data: [...data], show: false });
  };
  onEdit = (id) => {
    const { data } = this.state;
    const item = data.find((item) => item.id === id);

    if (item) {
      this.setState({ ...item, show: true });
    } else {
      console.log("loi");
    }
  };
  onEditCmt = (id) => {
    const { cmt } = this.state;
    const item = cmt.find((item) => item.id === id);

    if (item) {
      // this.setState({ ...item, show: true });
      console.log("ok");
    } else {
      console.log("loi");
    }
  };
  onDelete = (id) => {
    const { data } = this.state;
    const index = data.findIndex((item) => item.id === id);

    if (index > -1) {
      data.splice(index, 1);

      this.setState([...data]);
    }
  };
  onDeleteCmt = (id) => {
    const { cmt } = this.state;
    const index = cmt.findIndex((item) => item.id === id);

    if (index > -1) {
      cmt.splice(index, 1);

      this.setState([...cmt]);
    }
  };
  onSaveCmtData = (value, id) => {
    let { data, cmt } = this.state;

    const index = data.findIndex((item) => item.id === id);
    if (index > -1) {
      cmt.push({
        idPost: id,
        id: new Date().getTime(),
        value: value,
      });
      data[index] = {
        ...data[index],
        cmt: cmt,
      };
    }
    this.setState({ data: [...data] });
  };
  render() {
    const { show, showEdit, id, content, images, data, cmt } = this.state;
    return (
      <div className="App">
        <>
          <div className="status">
            <button onClick={this.onAdd}>Bạn ơi, bạn đang nghĩ gì thế?</button>
          </div>
          <List
            showEdit={showEdit}
            data={data}
            cmt={cmt}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            onSaveCmtData={this.onSaveCmtData}
            onEditCmt={this.onEditCmt}
            onDeleteCmt={this.onDeleteCmt}
          />
          <AddForm
            show={show}
            id={id}
            content={content}
            images={images}
            hideForm={this.hideForm}
            onSave={this.onSave}
          />
        </>
      </div>
    );
  }
}
export default App;
