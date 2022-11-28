export default class UserInfo {
    constructor(title, description) {
        this._userInfo = {
            name: title,
            job: description
        };
    }
    getUserInfo() {
        this.userInfo = {
            name: this._userInfo.name.textContent,
            job: this._userInfo.job.textContent
        }
        return this.userInfo
    }
    setUserInfo(data) {
        this._userInfo.name.textContent = data.name
        this._userInfo.job.textContent = data.job
    };
}