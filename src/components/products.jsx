import React, { Component } from 'react';

import { ProductService } from '../service/ProductService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class Product extends Component {

  constructor() {
    super();
    this.state = {
      visible: false,
      globalFilter: null,
      product: {
        id: "",
        name: "",
        category: "",
        unitPrice: "",
        active: ""
      },
      selectedProduct: {
      }

    };
    this.items = [

      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog() }
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: () => { this.showEditDialog() }
      },

      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.delete() }
      }
    ];


    this.productService = new ProductService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    
  }
  renderHeader() {
    return (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => this.setState({globalFilter: e.target.value})} placeholder="Global Search" />
            </span>
        </div>
    );
}

  componentDidMount() {
    this.productService.getAll().then(data => this.setState({ products: data }));
  }
  save() {
      this.productService.save(this.state.product).then(data => {
        this.setState({
          visible: false,
          product: {
            id: "",
            name: "",
            category: "",
            unitPrice: "",
            active: ""
          }
        });
        this.productService.getAll().then(data => this.setState({ products: data }));
        console.log(data)
      })
  }
  edit(){
    this.productService.edit(this.state.product.id, this.state.product).then(data => {
        this.setState({
          visible: false,
          product: {
            id: "",
            name: "",
            category: "",
            unitPrice: "",
            active: ""
          }
        });
        this.productService.getAll().then(data => this.setState({ products: data }));
        console.log(data)
      })

  }
  delete() {
    if (window.confirm("Are you sure to delete this record?")) {
      this.productService.delete(this.state.selectedProduct.id).then(data => {
        this.productService.getAll().then(data => this.setState({ products: data }))
      })
    }
  }

  render() {
    const header = this.renderHeader();
    return (
      <div style={{ width: '90%', marginTop: '80px', margin: '0 auto' }}>
        <div>
       
        </div>
        <Menubar model={this.items}></Menubar>
        <Panel  >
          <DataTable header={header} value={this.state.products} paginator={true} rows={4} selectionMode="single" globalFilter={this.state.globalFilter}
            selection={this.state.selectedProduct} onSelectionChange={e => this.setState({ selectedProduct: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="NAME"></Column>
            <Column field="category" header="CATEGORY"></Column>
            <Column field="unitPrice" header="UNIT PRICE"></Column>
            <Column field="active" header="ACTIVE"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Create Product" visible={this.state.visible}
          style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
          <br></br>
          <br></br>
          <form id="product-form">
            <span className="p-float-label">
              <InputText style={{ width: "100%" }} id="id" value={this.state.product.id} onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {

                  let product = Object.assign({}, prevState.product);
                  product.id = val;
                  return { product };

                })
              }
              } />
              <label htmlFor="id">ID</label>
            </span>
            <br></br>
            <br></br>
            <span className="p-float-label">
              <InputText style={{ width: "100%" }} id="name" value={this.state.product.name} onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let product = Object.assign({}, prevState.product);
                  product.name = val;
                  return { product };
                })
              }
              } />
              <label htmlFor="name">NAME</label>
            </span>
            <br></br>
            <br></br>

            <span className="p-float-label">
              <InputText style={{ width: "100%" }} id="category" value={this.state.product.category} onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let product = Object.assign({}, prevState.product);
                  product.category = val;
                  return { product };
                })
              }
              } />
              <label htmlFor="category">CATEGORY</label>
            </span>
            <br></br>
            <br></br>

            <span className="p-float-label">
              <InputText style={{ width: "100%" }} id="unitPrice" value={this.state.product.unitPrice} onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let product = Object.assign({}, prevState.product);
                  product.unitPrice = val;
                  return { product };
                })
              }
              } />
              <label htmlFor="unitPrice">UNIT PRICE</label>
            </span>
            <br></br>
            <br></br>
            <span className="p-float-label">
              <InputText style={{ width: "100%" }} id="active" value={this.state.product.active} onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let product = Object.assign({}, prevState.product);
                  product.active = val;
                  return { product };
                })
              }
              } />
              <label htmlFor="active">ACTIVE</label>
            </span>
          </form>
        </Dialog>

      </div>

    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      product: {
        id: "",
        name: "",
        category: "",
        unitPrice: "",
        active: ""
      }
    });
    this.footer = (
        <div>
          <Button label="Save" icon="pi pi-check" onClick={this.save}></Button>
        </div>
      );
  }

  showEditDialog() {
    this.setState({
      visible: true,
      product: {
        id: this.state.selectedProduct.id,
        name: this.state.selectedProduct.name,
        category: this.state.selectedProduct.category,
        unitPrice: this.state.selectedProduct.unitPrice,
        active: this.state.selectedProduct.active
      }
    });
    this.footer = (
        <div>
          <Button label="Savess" icon="pi pi-check" onClick={this.edit}></Button>
        </div>
      );
  }
}