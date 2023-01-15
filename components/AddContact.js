import React from "react";
import "./AddContact.css";
import { useState, useEffect } from "react";
import axios from "axios";

// ADD OR CREATE CONTACT
const AddContact = () => {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getContact(data);
  }, []);
  //   GET CONTACT
  const getContact = async () => {
    await axios
      .get("http://localhost:8000/posts")
      .then((res) => setData(res.data));
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  //  EDIT CONTACT
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    id: "",
  });
  //   HANDLE SUBMIT
  const handleFormSubmit = async (e) => {
    let response = await axios.post("http://localhost:8000/posts", formData);
    if (response) {
      alert("Your information submitted successfully!)");
    } else {
      alert("Something went wrong!(");
    }

    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
    });
    getContact();
  };
  //   HANDLE DELETE
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8000/posts/" + id)
      .then((res) => setData());
    getContact();
  };
  const handleEdit = async () => {
    await axios
      .put(`http://localhost:8000/posts/${editData.id}`, editData)
      .then((res) => {
        alert("Contact Edited!");
        getContact();
      });
  };

  //   FORM
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7"></div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div class="mb-3">
          <button className="btn btn-success" onClick={handleFormSubmit}>
            Add Contact
          </button>
        </div>
      </div>
      {""}
      <div>
        {/*  */}
        <h1>Contact List</h1>
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((contact) => (
                <tr>
                  <th scope="row">{contact.id}</th>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.email}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <button
                      type="button"
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        setEditData({
                          name: contact.name,
                          email: contact.email,
                          phone: contact.phone,
                          password: contact.password,
                          id: contact.id,
                        })
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* MODAL WINDOW */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Contact
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleEdit()}
              >
                Edit Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
