var React = require('react');
var ReactDOM = require('react-dom');
require('./sass/style.sass');

var MainPage = React.createClass({
  getInitialState:function(){
    return { api: []}
  },
  render: function(){
    var api = this.state.api.map(function(item, i){
      const updated = new Date(item.datetimes.updated);
      const executed = new Date(item.datetimes.lastExecuted);
      return (
        <tr key={i} >
          <th scope="row">{i+1}</th>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{updated.getDate()}</td>
          <td>{executed.getDate()}</td>
        </tr>
      )
    })
    return (
      <div className="container">
        <div className="row btn-box">
          <button type="button" className="btn btn-secondary col-6" onClick={() => {this.sortByUpdated()}} >Sort by last updated</button>
          <button type="button" className="btn btn-secondary col-6" onClick={this.sortByExecuted} >Sorted by last executed</button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>price</th>
              <th>last updated</th>
              <th>last executed</th>
            </tr>
          </thead>
          <tbody>{api}</tbody>
        </table>
      </div>
    );
  },
  componentWillMount:function(){
    fetch('/api').then(function(data){
      return data.json();
    }).then( json => {
      this.setState({api:json});
    });
  },
  sortByUpdated:function(){
    this.sortApi(function(a, b){
      const aTime = new Date(a.datetimes.updated);
      const bTime = new Date(b.datetimes.updated);
      return bTime.getTime()-aTime.getTime();
    })
  },
  sortByExecuted:function(){
    this.sortApi(function(a, b){
      const aTime = new Date(a.datetimes.lastExecuted);
      const bTime = new Date(b.datetimes.lastExecuted);
      return bTime.getTime()-aTime.getTime();
    })
  },
  sortApi:function(compare){
    var newapi = this.state.api;
    newapi.sort(compare);
    this.setState({ api: newapi});
  }
});

// Put component into main page
ReactDOM.render(<MainPage />, document.getElementById('mainpage'));
