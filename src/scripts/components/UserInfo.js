export default class UserInfo {
    constructor(title, description) {
        this._userInfo = {
            name: title,
            job: description
        };
    }
    getUserInfo() {
        return this._userInfo;
    }
    setUserInfo(data) {
        this._userInfo.name.textContent = data[0].name
        this._userInfo.job.textContent = data[0].job
    };
}