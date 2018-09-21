import React,{Component} from 'react'
import connect from 'react-redux/lib/connect/connect'
import MiniDrawer from '../subcomponents/MiniDrawer'
import {Route,withRouter,Switch} from 'react-router-dom'
import CreateAlbum from '../CreateAlbum'
import PhotoTimeline from '../PhotoTimeline'
class HomePage extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div>
                <MiniDrawer>
                    <Switch>
                        <Route  exact path="/user" component={PhotoTimeline}/>
                        <Route  path="/user/phototimeline" component={PhotoTimeline}/>
                        <Route  path="/user/upload" component={CreateAlbum}/>
                    </Switch>
                </MiniDrawer>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{

    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HomePage))