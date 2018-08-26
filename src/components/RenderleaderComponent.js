import React  from 'react';
import { Media } from 'reactstrap';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { Stagger, Fade } from 'react-animation-components';
function LeaderCard({ leaders, isLoading, errMess}) {
    if (isLoading) {
        return (
            <Loading/>
        )
    } else if(errMess) {
        return(
            <h4>{errMess}</h4>
        )
    } else {
        return (
            <Stagger in>
                {leaders.leaders.map((leader) => {
                    return (
                        <Fade in>
                            <div key={leader.id} className="col-12 mt-5">
                                <Media tag="li">
                                    <Media left middle>
                                        <Media object  src={baseUrl + leader.image} alt={leader.name}/>
                                    </Media>
                                    <Media body className="ml-5">
                                        <Media heading>{leader.name}</Media>
                                        <p>{leader.description}</p>
                                    </Media>
                                </Media>
                            </div>
                        </Fade>
                        )})}
                    </Stagger>
            )
        }
    }





function Renderleader(props) {
        return (
            <div className="container">
                <div className="row">
                    <Media list>

                            <LeaderCard leaders = { props.leaders } isLoading={props.leadersLoading} errMess={props.leadersErrMess} />

                    </Media>
                </div>
            </div>
        );
    }


export default Renderleader;