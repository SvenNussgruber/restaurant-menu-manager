import React, { Component } from 'react';
import MenuSection from './MenuSection';

class App extends Component {
    constructor() {
        super();
        this.state = {
            menuSections: [],
            menuSectionsKey: -1,
            activeSection: 0,
            activeSectionName: "",
            itemList: []
        }

        this.addMenuSection = this.addMenuSection.bind(this);
        this.handleMenuSectionClick = this.handleMenuSectionClick.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    //Handles the menu section button click
    addMenuSection() {
        let newMenuSectionName = prompt("Please enter a new menu section:");
        let tempMenuSections = this.state.menuSections;
        let menuSelectionKey = this.state.menuSectionsKey;
        let newMenuSection;

        //If a name was entered create a new menu section object and add it to state
        if (newMenuSectionName != null) {
            newMenuSection = {};
            newMenuSection["key"] = menuSelectionKey + 1;
            newMenuSection["name"] = newMenuSectionName;
            newMenuSection["items"] = [];
            tempMenuSections.push(newMenuSection);

            let newKey = menuSelectionKey + 1;

            this.setState({
                menuSections: tempMenuSections,
                menuSectionsKey: newKey,
                activeSection: newKey,
                activeSectionName: this.state.menuSections[newKey].name,
                itemList: this.state.menuSections[newKey].items.map((item) =>
                    <div className="border-bottom border-dark">
                        {item}
                    </div>
                )
            })
        }


    }

    //Handles the item section button click
    addItem() {
        let tempMenuSections = this.state.menuSections;

        //Check to see if a menu section exists, since items cant be added until a section is created
        if (tempMenuSections === undefined || tempMenuSections.length === 0) {
            alert("Please add a menu section first");
        } else {
            let newItem = prompt("Please enter a new item:");
            let activeSection = this.state.activeSection;

            if (newItem != null) {
                //Add new item to its corresponding menu section and update state
                tempMenuSections[activeSection].items.push(newItem);

                this.setState({
                    menuSections: tempMenuSections,
                    itemList: this.state.menuSections[this.state.activeSection].items.map((item) =>
                        <div className="border-bottom border-dark">
                            {item}
                        </div>
                    )
                })
            }
        }
    }

    //Handles clicking on menu section, making that the active section, and displaying corresponding items
    handleMenuSectionClick(i) {

        //i = the key of the menu section clicked
        this.setState({
            activeSection: i,
            activeSectionName: this.state.menuSections[i].name,
            itemList: this.state.menuSections[i].items.map((item) =>
                <div className="border-bottom border-dark">
                    {item}
                </div>
            )
        })
    }

    render() {
        //Create an array of menu section components from menuSections in state
        let menuSections = this.state.menuSections.map((item) =>
            <MenuSection item={item} onItemClick={() => this.handleMenuSectionClick(item.key)} />
        );

        return (
            <div className="App">
                <div className="container pt-3 d-flex justify-content-around">
                    <div className="col-md-5">
                        <h4>Active Section: {this.state.activeSectionName}</h4>
                        <span className="d-flex border border-dark p-2">
                            <h2>Menu Sections</h2>
                            <button className="ml-auto mt-2 mb-2" onClick={this.addMenuSection}>+</button>
                        </span>
                        <div className="container border border-dark  d-flex flex-column">
                            {menuSections}
                        </div>
                    </div>
                    <div className="col-md-5">
                        <h4>&nbsp;</h4>
                        <span className="d-flex border border-dark p-2">
                            <h2>{this.state.activeSectionName} Items</h2>
                            <button className="ml-auto mt-2 mb-2" onClick={this.addItem}>+</button>
                        </span>
                        <div className="container border border-dark d-flex flex-column">
                            {this.state.itemList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
