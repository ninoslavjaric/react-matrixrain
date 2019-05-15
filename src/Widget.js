import React from 'react';
import axios from 'axios';
import './Widget.css';
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Widget extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         email: "",
         name: "",
         clickLogger: "",
         contacts: [],
      };
   };

   processClick = (event) => {
      event.preventDefault();

      let target = event.currentTarget;
      let data = {key: target.getAttribute('href')};

      axios.put(this.state.clickLogger, data)
         .then(res => {
            window.open(target.getAttribute('href'), target.getAttribute('target'));
         }).catch(error => {
            window.open(target.getAttribute('href'), target.getAttribute('target'));
      })
   };

   getCv = () => {
      let search = window.location.search.substring(1);
      let getParams = null;
      if (search) {
         let json = "{\"" + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + "\"}";
         getParams = JSON.parse(json);
      }

      if (
         window.location.hash === "#withcv" || (getParams != null && typeof getParams.withcv !== 'undefined' && getParams.withcv === 'true')
      ) {
         return (
            <sub>
               <a onClick={this.processClick} href="/cv.pdf" className="btn btn-light">
                  CV
                  <i className="fa fa-download" aria-hidden="true"></i>
               </a>
            </sub>
         );
      }
   };

   componentDidMount = () => {
      let source = "/init";
      axios.get(source)
         .then(res => {
            this.setState({
               name: res.data.name,
               email: res.data.email,
               clickLogger: res.data.clickLogger,
               contacts: typeof res.data.contacts === 'undefined' ? [] : res.data.contacts,
            });
         })
   };

   render = () => {
      return (
         <div className="absolutist widget-frame">
            <div className="widget">
               <div className="container">
                  <div className="row">
                     <div className="col-sm-12">
                        <h1 className="text-center">
                           {this.state.name}
                           {this.getCv()}
                        </h1>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-sm-12 contacts text-center">
                        {
                           this.state.contacts.map((item, key) => {
                                 return (
                                    <div key={key}>
                                       <a onClick={this.processClick}
                                          target={typeof item.target === 'undefined' ? '_blank' : item.target}
                                          href={item.icon === 'envelope' ? atob(item.href) : item.href}
                                          title={item.title}
                                          data-original-title={item.title}
                                       >
                                          <i className={"fa fa-" + item.icon}>

                                          </i>
                                       </a>
                                    </div>
                                 )
                              }
                           )
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Widget;