export default class UserInfo {
    constructor(title, description, avatar) {
        this._userInfo = {
            name: title,
            job: description,
            avatar: avatar
        };
    }
    getUserInfo() {
        this.userInfo = {
            name: this._userInfo.name.textContent,
            job: this._userInfo.job.textContent
        }
        return this.userInfo
    }
    setAvatar(data) {
        this._userInfo.avatar.src = data.avatar;
    }
    setUserInfo(data) {
        this._userInfo.name.textContent = data.name;
        this._userInfo.job.textContent = data.about;
    };
}