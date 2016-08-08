/**
 * Created by sheldon on 2016/7/27.
 */
'use strict';

class R_IndexHospital extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitals: []
        }
    }

    componentWillMount() {
        this.getHospital()
    }

    getHospital() {
        HttpService.query({
            url: '/pc/computer/query_cooperative_hospital',
            success: (res) => {
                this.setState({hospitals: res.cooperativeHospital})
            }
        });
    }

    render() {

        var tempFive = [];

        for (var i=0; i<this.state.hospitals.length; i++) {
            var index = parseInt(i / 5);

            tempFive[index] = tempFive[index] || [];
            tempFive[index].push(this.state.hospitals[i]);
        }

        console.log(tempFive);


        var hospitals = tempFive.map(function (item, index) {

            var tdNodes = item.map(function (subItem, subIndex) {
                return (
                    <td style={{border:'#DFDFDF 1px solid'}} key={subIndex}>
                        <div>
                            <img src={subItem.linkHerPic} style={{width:239,height:88}}/>
                        </div>
                    </td>
                )
            });

            return (
                <tr key={index} style={{border:'#DFDFDF 1px solid'}}>
                    {tdNodes}
                </tr>
            )
        });

        return (
            <div className="wrap">
                <table style={{borderCollapse:'collapse',border:'#DFDFDF 1px solid'}}>
                    <tbody>
                    {hospitals}
                    </tbody>
                </table>

                <div style={{clear:'both'}}>
                </div>
            </div>
        )

    }
}