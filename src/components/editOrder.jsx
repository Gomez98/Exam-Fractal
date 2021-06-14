import React, { Component, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { OrderService } from '../service/OrderService';


export default class EditOrder extends Component {
    useEffect(() => {

    });

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
      
        this.orderService.getById(id).then(data => this.setState({ orders: data }));
    }
    render() {
        
        return (
            <div>
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
            </div>

        )

    
    }
}