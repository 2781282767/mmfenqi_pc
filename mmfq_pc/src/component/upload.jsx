'use strict';

class R_Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pic_img: [],
            index: 1,//上传所需

        }
    }


    /*上传按钮*/
    _uploadBtn(id) {

        this.setState({
            id: id
        });

        $('#_layer'+this.props.orderId).css('display', 'block');

        this.look_informed_consent(id);

    }

    /*删除知情同意书*/

    delete_img(i) {

        console.log(i);
        var jsonData = {
            index: i + 1,
            orderId: this.state.id
        };
        $.ajax({
            type: 'post',
            url: '/pc/computer/del_informed_consent',
            data: jsonData,
            dataType: 'json',
            success: function (res) {

                if (res.result == '0') {


                    console.log(this.state.pic_img)

                    // this.setState({
                    //     pic_img: this.state.pic_img.splice(i,i+1)
                    // })


                 //   $("#" + i).remove();


                    this.look_informed_consent(this.state.id);


                }

            }.bind(this)
        })
    }

    /*确定上传*/

    confirm_upload() {

        var jsonData = {
            orderId: this.state.id
        };


        $.ajax({
            type: 'post',
            url: '/pc/computer/confirm_upload',
            data: jsonData,
            dataType: 'json',
            success: (data)=> {


                if (data.result == '0') {

                    this.setState({
                        pic_img: []
                    });

                    $('#_layer'+this.props.orderId).css('display', 'none');

                    window.location.reload()


                }

            }
        })

    }


    /*查看知情同意书*/

    look_informed_consent(id) {
        var jsonData = {
            orderId: id,
        };

        $.ajax({
            url: '/pc/computer/query_informed_consent',
            type: 'post',
            data: jsonData,
            dataType: 'json',
            success: function (res) {
                if (res.result == '0') {
                    var index_l = res.data.informedConsent.length;


                    this.setState({
                        pic_img: res.data.informedConsent,
                        index: ++index_l
                    });
                }
            }.bind(this)
        })
    }

    cancle() {
        $('#_layer'+this.props.orderId).css('display', 'none');
    }

    /*选择图片上传*/
    _upload() {


        var data = new FormData();
        data.append('orderId', this.state.id);
        data.append('index', this.state.index);
        data.append('informedConsentPic', $("#_file"+this.props.orderId)[0].files[0]);


        console.log($("#_file"+this.props.orderId)[0].files[0]);
        //console.log(new FormData($('#uploadForm')[0]));
        var json = {
            informedConsentPic: $("#_file"+this.props.orderId)[0].files[0],
            orderId: this.state.id,
            index: 1,

        };

        console.log(this.state);

        $.ajax({
            url: '/pc/computer/upload_informed_consent',
            type: 'post',
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.result == '0') {
                    this.setState({
                        pic_img: this.state.pic_img.concat(res.data.informedConsentPicUrl)
                    })

                    this.look_informed_consent(this.state.id);


                }
            }.bind(this)
        })
    }

    render() {
        return (
            <div>
                <div className="_layer" id={"_layer"+this.props.orderId}>
                    <div className="_z"></div>
                    <div className="aaa">

                        <div className="header">
                            <div className="title">上传知情同意书</div>
                            <div className="cance" onClick={this.cancle.bind(this)}>x</div>
                        </div>
                        <div className="content">
                            <div>

                                {
                                    this.state.pic_img.map((img, i)=> {
                                        return <div className="img" key={i} id={i}>
                                            <img src={img}/>
                                            <div className="delete-img" onClick={this.delete_img.bind(this, i)}>x</div>
                                        </div>
                                    })
                                }

                                <div className="img">
                                    <img src="../static/images/upload/upload.png" style={{position: 'relative'}}/>

                                    <form action="#" id="uploadForm">
                                        <input type="file" id={"_file"+this.props.orderId} onChange={this._upload.bind(this)}/>
                                    </form>

                                </div>

                            </div>

                        </div>
                        <div className="foot">
                            <div className="btn" onClick={this.confirm_upload.bind(this)}><img
                                src="../static/images/upload/uplaod_btn.png"/>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#" className="_btn btn_btn" style={{display:this.props.projectReviewStatus==0? 'inline':'none'}} onClick={this._uploadBtn.bind(this,this.props.orderId)}>上传知情同意书</a>
            </div>

        )

    }
}
