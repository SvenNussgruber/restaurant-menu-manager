import React, { Component } from 'react';

class MenuSection extends Component {
    render() {
        return (
            <div key={this.props.item.key} 
                className="border-bottom border-dark"
                onClick={this.props.onItemClick}>
                {this.props.item.name}
            </div>
        )
    }
}

export default MenuSection;