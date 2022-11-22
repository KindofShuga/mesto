import { profileTitle, profileDescription } from './index.js';
export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }
    getUserInfo() {
        this._name.value = profileTitle.textContent;
        this._job.value = profileDescription.textContent;
    }
    setUserInfo() {
        profileTitle.textContent = this._name.value;
        profileDescription.textContent = this._job.value;
    }
}