/* Not satisfied with this, but time is running off and i learned something */ 

import React from 'react';
import './homepage.styles.scss';
import {Sigma, RelativeSize} from 'react-sigma';


class Homepage extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            graph:{
                nodes: [
                  { "id": "nA", "label": "A", "x": 1, "y": 1, "size": 24 ,"visited": false},
                  { "id": "nB", "label": "B", "x": 3, "y": 1, "size": 24 ,"visited": false},
                  { "id": "nC", "label": "C", "x": 2, "y": 4, "size": 24 ,"visited": false},
                  { "id": "nD", "label": "D", "x": 1, "y": 6, "size": 24 ,"visited": false},
                  { "id": "nE", "label": "E", "x": 6, "y": 2, "size": 24 ,"visited": false},
                  { "id": "nF", "label": "F", "x": 5, "y": 4, "size": 24 ,"visited": false},
                  { "id": "nG", "label": "G", "x": 6, "y": 6, "size": 24 ,"visited": false},
                  { "id": "nH", "label": "H", "x": 8, "y": 6, "size": 24 ,"visited": false}
                ],
                edges: [
                  { "id": "e0", "source": "nA", "target": "nB" },
                  { "id": "e1", "source": "nA", "target": "nD", "color": "#00ff00" },
                  { "id": "e2", "source": "nA", "target": "nC" },
                  { "id": "e3", "source": "nB", "target": "nE" },
                  { "id": "e4", "source": "nB", "target": "nC" },
                  { "id": "e5", "source": "nB", "target": "nF" },
                  { "id": "e6", "source": "nC", "target": "nF" },
                  { "id": "e7", "source": "nD", "target": "nG", "color": "#00ff00" },
                  { "id": "e8", "source": "nE", "target": "nG" },
                  { "id": "e9", "source": "nF", "target": "nG" },
                  { "id": "e10", "source": "nG", "target": "nH", "color": "#00ff00" }
                ]
              },
              end: 'nH',
              start: 'nA'
        }
        this.findAllPaths = this.findAllPaths.bind(this);
        this.allNeighbours = this.allNeighbours.bind(this);
        this.recursiv = this.recursiv.bind(this);

    }
    
    allNeighbours(start, edges, path1){
        // Edges can go from source to target + and from target to source
        // Nodes wich are already part of Path1 are excluded.
        let res = [] 
        console.log("allN1:", path1)
        res = edges.filter(edge => (edge.source === start && !path1.includes(edge.target))) //|| (edges.target === start && !path1.includes(edges.source)))  
        console.log("allN2:", path1)
        //return edges.filter(edge => edge.source === start)
        return res;
    }

    
   
    recursiv(edgesNow, path, end, allPaths ) {
        console.log(path, edgesNow)
        edgesNow.forEach(element => {
            let path1 = path
            path1.push(element.target);
            
            if (element.target === end){
                allPaths.push(path1)
                console.log('path finish', path1)
                path1 = ''
            } else {
                console.log('path1:', path1)
                let edgesNext = this.allNeighbours(element.target, this.state.graph.edges, path1)
                this.recursiv(edgesNext, path1, allPaths)    
            }
    })}
    initRecursiv(start, end, edges){
        let allPaths = []
        let path = []
        path.push(start)
        console.log("initRecursiv path", start, path)    
        let nextNodes = this.allNeighbours(start, edges, path)

        console.log('nextNodes', nextNodes)
        this.recursiv(nextNodes, path, end, allPaths)
        return allPaths;
    }
    findAllPaths(props){
        let start = this.state.start
        let end = this.state.end
        let edges = this.state.graph.edges
        // let nodes = this.state.graph.nodes
       

        let allPaths = this.initRecursiv(start, end, edges)
        console.log('Result Test 1:', allPaths)

        let maxLength = null;
        let shortestWay = '';
        allPaths.forEach(element => { 
            if (maxLength === null  || element.length < maxLength ){
                maxLength = element.length;
                shortestWay = element
                // TODO: What if two ways are the same length
            }
        })
        console.log('Result Test 2:', shortestWay)

    }
    componentDidMount(){
        console.log('edges', this.state.graph.edges)

    }
    onChange = e =>  {
        console.log(this.state.end, this.state.start)  
        const {value, name} =e.target
        console.log(value, name)
        this.setState({
            [name]: value
          })
    }

    render(){
        return (
            <div className='HomePage'>
            <h1>Coding Challenge</h1>
            <button className="button1" onClick={this.findAllPaths}>First Find all Pathes</button>
            <div className="select">            
            <label className="select-label">Start Node: </label>
            <select name="start" className="select-box" value={this.state.start} onChange={this.onChange.bind(this)}>
            {
                this.state.graph.nodes
                .filter((node) => node.id !== this.state.end)
                .map(node => {
              return <option value={node.id} key={node.id} >{node.label}</option>
            })}
            </select>
            </div>

            <div className="select">            
            <label className="select-label">End Node: </label>
            <select name="end" className="select-box" value={this.state.end} onChange={this.onChange.bind(this)}>
            {
                this.state.graph.nodes
                .filter((node) => node.id !== this.state.start)
                .map(node => {
              return <option value={node.id} key={node.id} >{node.label}</option>
            })}
            </select>
            </div>          
            <span>Results and Calculation are visulized in console</span>
            <Sigma className="graph" styles={{width : 600, height : 400}} graph={this.state.graph} settings={{drawEdges: true, minEdgeSize: 2, clone: false, defaultLabelSize: 14, labelThreshold: 0}}>
            <RelativeSize initialSize={10}/>
            </Sigma>
            </div>
        )
    }
}
export default Homepage;