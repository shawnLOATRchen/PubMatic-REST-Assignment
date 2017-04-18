var React = require('react');
var ReactDOM = require('react-dom');
require('./sass/style.sass');

var MainPage = React.createClass({
  getInitialState:function(){
    return {
      original: [],
      api: [],
      tags: [
        { tag: "tag1", checked: false},
        { tag: 'tag2', checked: false},
        { tag: 'tag3', checked: false}
      ],
      order: 'regular',
      hasChecked: false
    }
  },
  render: function(){
    var api = this.state.api.map(function(item, i){
      const updated = this.getFormatedTime(item.datetimes.updated);
      const executed = this.getFormatedTime(item.datetimes.lastExecuted);
      return (
        <tr key={i} >
          <th scope="row">{i+1}</th>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{updated}</td>
          <td>{executed}</td>
        </tr>
      )
    }.bind(this));
    var tags = this.state.tags.map(function(item, i){
      return (
        <label className="btn btn-info" key={i} >
          <input type="checkbox" className="tagcheck" checked={item.checked} onClick={this.checkTag} value={item.tag}/>
            {item.tag}
        </label>
      )
    }.bind(this));
    return (
      <div className="container">
        <div className="row btn-box">
          <button type="button" className="btn btn-secondary col-4" onClick={this.sortByUpdated} >Sort by last updated</button>
          <button type="button" className="btn btn-secondary col-4" onClick={this.sortByExecuted} >Sorted by last executed</button>
          <div className="input-group input-group-md col-3 rows-shown">
            <span className="input-group-addon" id="sizing-addon1">Rows Shown</span>
            <input type="text" className="form-control" ref="rows" onChange={this.changeRows} placeholder="10"/>
          </div>
        </div>
        <h5> Choose Tags </h5>
        <div className="btn-group">{tags}</div>
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
    this.getApi();
  },
  getApi:function(){
    fetch('/api').then(function(data){
      return data.json();
    }).then( json => {
      this.setState({original:json, api:json});
    });
  },
  changeRows:function(){
    var api = this.state.original;
    var len = Math.min(api.length, this.refs.rows.value);
    len = len == 0 ? api.length : len;
    var newApi = [];
    for(var i = 0; i < len; i++) newApi.push(api[i]);
    this.setState({ api: newApi});
  },
  checkTag:function(e){
    var tags = this.state.tags;
    var hasChecked = false;
    tags.forEach(function(tag){
      if (tag.tag == e.target.value) tag.checked = !tag.checked;
      if (tag.checked) hasChecked = true;
    })
    this.setState({tags: tags, hasChecked: hasChecked}, function(){
      this.sortTag()
    });
  },
  sortTag:function(){
    if (this.state.hasChecked){
      var api = this.state.original;
      var newApi = [];
      api.forEach(function(item){
        var fit = true;
        this.state.tags.forEach(function(tag){
          if (tag.checked && !item.tags.includes(tag.tag)) {
            fit = false;
          }
        })
        if (fit) newApi.push(item);
      }.bind(this))
      this.setState({ api: newApi});
    }else{
      this.getApi();
    }
  },
  sortByUpdated:function(){
    this.sortApi(function(a, b){
      const aTime = new Date(a.datetimes.updated);
      const bTime = new Date(b.datetimes.updated);
      return bTime.getTime()-aTime.getTime();
    })
    this.setState({ order: 'updated'});
  },
  sortByExecuted:function(){
    this.sortApi(function(a, b){
      const aTime = new Date(a.datetimes.lastExecuted);
      const bTime = new Date(b.datetimes.lastExecuted);
      return bTime.getTime()-aTime.getTime();
    })
    this.setState({ order: 'executed'});
  },
  sortApi:function(compare){
    var api = this.state.api;
    api.sort(compare);
    this.setState({ api: api});
  },
  getFormatedTime:function(str){
    const time = new Date(str);
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    month = month < 10 ? '0'+month : month;
    var date = time.getDate() < 10 ? '0'+time.getDate() : time.getDate();
    var hour = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
    var minute = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
    return hour+':'+minute+' '+date+'/'+month+'/'+year;
  },

});

// Put component into main page
ReactDOM.render(<MainPage />, document.getElementById('mainpage'));
