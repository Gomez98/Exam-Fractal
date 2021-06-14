import React, { Component } from 'react';

import { OrderService } from '../service/OrderService';
import { ProductService } from '../service/ProductService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useParams} from 'react-router-dom'
//import { Toast } from 'primereact/toast';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom"
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




const arrItems = [{
    product: {},
    quantity: ""
}];
export default class Order extends Component {


    constructor() {

        super();
        this.state = {
            visible: false,
            globalFilter: null,
            order: {
                orderNumber: "",
                status: "",
                date: "",
                customer: "",
                totalAmount: "",
                totalTaxes: "",
                orderItems: [
                ]
            },
            product: {
                id: "",
                name: "",
                category: "",
                unitPrice: "",
                active: ""
            },
            selectedProduct: {
            },
            selectedStatus: "",
            selectedItem: [{
                product: {},
                quantity: ""
            }
            ],
            item: [
                {
                    product: {},
                    quantity: ""
                }
            ]
        };
        this.status = [
            { name: "Pending", code: "Pending" },
            { name: "Completed", code: "Completed" },
            { name: "Rejected", code: "Rejected" }
        ];


        this.orderService = new OrderService();
        this.productService = new ProductService();
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }
    renderHeader() {
        return (
            <div className="table-header">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
                </span>
            </div>
        );
    }
    onHide(name) {

        arrItems.push(this.state.item);
        this.setState({
            [`${name}`]: false
        });
    }
    renderFooter(name) {
        return (
            <div>

                <Button label="Add" icon="pi pi-plus" onClick={() => this.onHide(name)} autoFocus />
            </div>
        );
    }
    componentDidMount() {
        this.orderService.getAll().then(data => this.setState({ orders: data }));
        this.productService.getAll().then(data => this.setState({ products: data }));
    }
    save() {
        this.orderService.save(this.state.order).then(data => {
            this.setState({
                visible: false,
                order: {
                    orderNumber: "",
                    status: "",
                    date: "",
                    customer: "",
                    totalAmount: "",
                    totalTaxes: "",
                    orderItems: [
                    ]
                }
            });
            this.orderService.getAll().then(data => this.setState({ orders: data }));
        })
    }
    edit() {
        this.orderService.edit(this.state.order.id, this.state.order).then(data => {
            this.setState({
                visible: false,
                order: {
                    orderNumber: "",
                    status: "",
                    date: "",
                    customer: "",
                    totalAmount: "",
                    totalTaxes: "",
                    orderItems: [
                    ]
                }
            });
            this.orderService.getAll().then(data => this.setState({ orders: data }));
        })

    }
    delete() {
        if (window.confirm("Are you sure to delete this record?")) {
            this.orderService.delete(this.state.selectedOrder.orderNumber).then(data => {
                this.orderService.getAll().then(data => this.setState({ orders: data }))
            })
        }
    }
    onStatusChange(e) {
        this.setState({ selectedStatus: e.value });
    }

    onProductSelect(e) {

        this.setState({
            visible: true

        });
        this.setState({
            selectedProduct: e.value
        },
            () => {
                this.op.hide();
            }

        );
    }

    render() {
        const header = this.renderHeader();
        return (

            <Route>
                <div style={{ width: '90%', marginTop: '80px', margin: '0 auto' }}>
                    <div className="btn-group">

                        <Link to="/orders/new" className="btn btn-dark">NEW ORDER</Link>
                        <Link to="/orders/edit" className="btn btn-dark">EDIT ORDER</Link>
                        <Button icon="pi pi-trash" label="Delete Order" onClick={() => this.delete()} />
                    </div>
                    <Switch>
                        <Route path="/orders/new" exact>
                            <br />
                            <br />
                            <br />
                            <span className="p-float-label">

                                <InputText style={{ width: "100%" }} value={this.state.order.orderNumber} id="orderNumber" onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {

                                        let order = Object.assign({}, prevState.order);
                                        order.orderNumber = val;
                                        return { order };

                                    })
                                }
                                } />
                                <label htmlFor="id">N°</label>
                            </span>
                            <br></br>
                            <br></br>
                            <span className="p-float-label">
                                <InputText style={{ width: "100%" }} id="customer" value={this.state.order.customer} onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {

                                        let order = Object.assign({}, prevState.order);
                                        order.customer = val;
                                        return { order };

                                    })
                                }
                                } />
                                <label htmlFor="customer">CUSTOMER</label>
                            </span>
                            <br></br>
                            <br></br>

                            <Dropdown value={this.state.selectedStatus} options={this.status} onChange={this.onStatusChange}
                                optionLabel="name" placeholder="Select status" />
                            <br></br>
                            <br></br>

                            <Button icon="pi pi-plus" label="Add Item" onClick={(e) => this.op.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="select-product-button" />
                            <Button icon="pi pi-check" label="Save" onClick={true} className="select-product-button" />


                            <DataTable header={header} value={this.state.arrItems} paginator={true} rows={4} selectionMode="single"
                                selection={this.state.selectedItem} onSelectionChange={e => this.setState({ selectedItem: e.value })}>
                                <Column field="id" header="ID"></Column>
                                <Column field="name" header="NAME"></Column>
                                <Column field="quantity" header="QUANTITY"></Column>
                                <Column field="unitPrice" header="PRICE"></Column>
                                <Column field="amount" header="TOTAL"></Column>
                            </DataTable>

                        </Route>





                        <Route path="/orders" exact>
                            <Panel >
                                <DataTable header={header} value={this.state.orders} paginator={true} rows={4} selectionMode="single"
                                    selection={this.state.selectedOrder} onSelectionChange={e => this.setState({ selectedOrder: e.value })}>
                                    <Column field="orderNumber" header="ID"></Column>
                                    <Column field="status" header="STATUS"></Column>
                                    <Column field="customer" header="CUSTOMER"></Column>
                                    <Column field="date" header="DATE"></Column>
                                    <Column field="totalAmount" header="TOTAL"></Column>
                                </DataTable>
                            </Panel>
                        </Route>








                        <Route path="/orders/edit/:id" exact>
                            <span className="p-float-label">

                                <InputText style={{ width: "100%" }} value={this.state.order.orderNumber} id="orderNumber" onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {

                                        let order = Object.assign({}, prevState.order);
                                        order.orderNumber = val;
                                        return { order };

                                    })
                                }
                                } />
                                <label htmlFor="id">N°</label>
                            </span>
                            <br></br>
                            <br></br>
                            <span className="p-float-label">
                                <InputText style={{ width: "100%" }} id="customer" value={this.state.order.customer} onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {

                                        let order = Object.assign({}, prevState.order);
                                        order.customer = val;
                                        return { order };

                                    })
                                }
                                } />
                                <label htmlFor="customer">CUSTOMER</label>
                            </span>
                            <br></br>
                            <br></br>

                            <Dropdown value={this.state.selectedStatus} options={this.status} onChange={this.onStatusChange}
                                optionLabel="name" placeholder="Select status" />
                            <br></br>
                            <br></br>

                            <Button icon="pi pi-plus" label="Add Item" onClick={(e) => this.op.toggle(e)} aria-haspopup aria-controls="overlay_panel" className="select-product-button" />
                            <Button icon="pi pi-check" label="Save" onClick={true} className="select-product-button" />


                            <DataTable header={header} value={this.state.arrItems} paginator={true} rows={4} selectionMode="single"
                                selection={this.state.selectedItem} onSelectionChange={e => this.setState({ selectedItem: e.value })}>
                                <Column field="id" header="ID"></Column>
                                <Column field="name" header="NAME"></Column>
                                <Column field="quantity" header="QUANTITY"></Column>
                                <Column field="unitPrice" header="PRICE"></Column>
                                <Column field="amount" header="TOTAL"></Column>
                            </DataTable>
                        </Route>
                    </Switch>

                    <OverlayPanel ref={(el) => this.op = el} showCloseIcon id="overlay_panel" style={{ width: '450px' }} className="overlaypanel-demo">

                        <DataTable header={header} value={this.state.products} paginator={true} rows={5} selectionMode="single"
                            selection={this.state.selectedItem.product} onSelectionChange={this.onProductSelect} globalFilter={this.state.globalFilter}>
                            <Column field="name" header="NAME"></Column>
                            <Column field="category" header="CATEGORY"></Column>
                            <Column field="unitPrice" header="UNIT PRICE"></Column>
                        </DataTable>

                    </OverlayPanel>

                    <Dialog header="Add Item" visible={this.state.visible} style={{ width: '400px' }} footer={this.renderFooter('visible')}
                        modal={true} onHide={() => this.setState({ visible: false })}>
                        <form id="order-form">

                            <span className="p-float-label">
                                <InputText style={{ width: "100%" }} id="product" value={this.state.selectedProduct.name} disabled={true} onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {

                                        let item = Object.assign({}, prevState.selectedItem);
                                        item.product.name = val;
                                        return { item };

                                    })
                                }
                                } />
                                <label htmlFor="name">NAME</label>
                                <br />
                                <br />
                                <InputText style={{ width: "100%" }} id="quantity" value={this.state.selectedItem.quantity} onChange={(e) => {
                                    let val = e.target.value;
                                    this.setState(prevState => {


                                        let item = Object.assign({}, prevState.selectedItem);
                                        item.quantity = val;
                                        return { item };

                                    })
                                }
                                } />
                                <label htmlFor="quantity">QUANTITY</label>
                            </span>
                            <br></br>
                            <br></br>
                        </form>
                    </Dialog>


                </div>
            </Route>
        );
    }
}