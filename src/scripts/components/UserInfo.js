export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
        this._profileTitle = document.querySelector('.profile__title');
        this._profileDescription = document.querySelector('.profile__description');
    }
    getUserInfo() {
        this._name.value = this._profileTitle.textContent;
        this._job.value = this._profileDescription.textContent;
    }
    setUserInfo() {
        this._profileTitle.textContent = this._name.value;
        this._profileDescription.textContent = this._job.value;
    }
}