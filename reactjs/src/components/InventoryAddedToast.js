import React from "react";
import {Toast, ToastBody} from "react-bootstrap";

class InventoryAddedToast extends React.Component{
    render() {
        const toastCss= {
            position: 'fixed',
            top: '20px',
            right: '20px',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px o rgba(0,0,0,0.9)'
        }
        return(
            <div style={this.props.children.show ? toastCss : null }>
                <Toast className={' border border-dark'}
                       show={this.props.children.show}
                >
                    <Toast.Header className={'bg-warning'}>
                        <strong className={'mr-auto'}>Success</strong>

                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        )
    }
}
export default InventoryAddedToast;