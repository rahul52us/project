import {
    Avatar,
    Button,
    Col,
    Divider,
    message,
    Modal,
    Row,
    Typography,
    Upload,
} from "antd";
import React from "react";
import ImgCrop from "antd-img-crop";
import { disFlexColCenter } from "../../scssfile/InlineVariable";
import axios from "axios";
import api from "../../config/backendApi/BackendApi";
import { Notify } from "../../config/Notify/Notify";

const Userprofilemodal = (props) => {
    const { user, userDetailInfoFunction } = props;
    const uploadImage = async (e) => {
        console.log(e.file.status);
        if (e.file) {
            const newForm = new FormData();
            newForm.append("file", e.file.originFileObj);
            try {
                if (e.file.status !== "uploading" && e.file.status !== "error") {
                    api.post("/api/pdf/upload/pdf/", newForm).then((res) => {
                        if (res.status === 200) {
                            console.log("the file is ", e.file);
                            Notify({
                                message: "profile upload successfully",
                                type: "success",
                            });
                        } else {
                            Notify({ message: "upload failed", type: "error" });
                            return;
                        }
                    });
                }
                if (e.file.error) {
                    Notify({ message: "upload failed", type: "error" });
                    return;
                }
            } catch (err) {
                message.error("upload failed try again later");
                return;
            }
        }
        console.log(e.file);
    };

    return (
        <Modal
            footer={null}
            visible={props.showHeaderModal}
            onCancel={() => props.setShowHeaderModal(false)}
            closable={false}
        >
            <Row justify="end">
                <Button>Logout</Button>
            </Row>
            <Divider />
            <Row style={disFlexColCenter}>
                <ImgCrop rotate>
                    <Upload
                        action={process.env.REACT_APP_BACKEND_API + "/api/pdf/upload/pdf/"}
                        progress={(e) => console.log(e)}
                        headers={{
                            Authorization: `Bearer ${localStorage.getItem(
                                process.env.REACT_APP_AUTHORIZATION_TOKEN
                            )}`,
                        }}
                        onChange={uploadImage}
                        accept=".png,.jpg"
                        showUploadList={false}
                        multiple={false}
                        maxCount={1}
                    >
                        <Avatar
                            src={user.pic}
                            style={{ width: "100px", height: "100px" }}
                        />
                    </Upload>
                </ImgCrop>
                <Typography.Title strong={true} level={4}>
                    {user.email}
                </Typography.Title>
                <Typography.Title level={5}>{user.name}</Typography.Title>
            </Row>
            <Divider orientation="right" style={{ color: "red" }}>
                <Button onClick={() => userDetailInfoFunction(user)}>
                    Edit Details
                </Button>
            </Divider>
            <Row justify="space-between">
                {user &&
                    user?.pdfAccess?.map((item, index) => {
                        return (
                            <Col span={8} key={index}>
                                <Button>{item}</Button>
                            </Col>
                        );
                    })}
            </Row>
        </Modal>
    );
};
export default Userprofilemodal;
