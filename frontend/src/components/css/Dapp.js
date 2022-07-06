import React, {Component} from "react";

import {ethers} from "ethers";

import ArtMakerArtifact from "../contracts/ArtMaker.json";
import ArtMakerArtifact from "../contracts/contract-address-artMaker.json";

import {Loading} from "./Loading.js";
import {Loading} from "./Gallery.js";
import "./css/Dapp.css";

export class Dapp extends Component{
    constructor(props){
        super(props);

        this.initialState = {
            art: []
        }
        this.state = this.initialState;
    }
    componentDidMount = async () => {
        this._initializeEthers();
    }

    componentWillUnmount = async() => {
        this.resetState();
    }
    //renderizado de la pagina con el gallery.js
    
    render(){
        if(this.state.art.length === 0){
            return <Loading/ > 
        }
        return(
            <div className="container p-4">
                <div className="row">
                <div className="col-12">
                    <h1>
                    NFarm Cattle
                    </h1>
                    <p>
                    </p>
                </div>
                </div>
                <div className="row">
                <div className="mt-3">
                    {
                    <Garllery
                        transferData = {this.state.art}
                        />
                    }
                    </div>
                    </div>
                </div>
        );
    } 

    async _initializeEthers(){
        try{
            this._provider = new ethers.providers.Web3Provider(window.ethereum);
            
            this._artMaker = new ethers.Contract(
                artMakerContract.artMaker,
                ArtMakerArtifact.abi,
                this._provider
            );

            // vamos a hacer la carga de los nft's

            const artCount = await this._artMaker.artRegistered();

            for (let i = 0; i < artCount; i++){
                const storedData = await this._artMaker.tokenURI(i); //aca importamos el uri del stored data que definimos antes.

                fetch(storedData)
                .then((res) => res.json())
                .then((data)=>{
                    this.setState(prevState =>({ //aqui sacamos el estado
                        art:[
                            ...this.state.art, // aca estamos cargando los datos y actualizando el estado.
                            data
                        ]
                    }))
                })
            }
        }catch(error){
            console.log(error);
        }
    }
        //estamos aca resetenadno el estado, del que estamos al inicial

    _resetState(){
        this.setState(this.initialState);
    }

}