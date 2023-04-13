class UserInfo {
    constructor({selectorName, selectorAbout}) {
        this._profileName = document.querySelector(selectorName);
        this._profileAbout = document.querySelector(selectorAbout);
    }

    getUserInfo() {
        const data = {};
        data.name = this._profileName.textContent;
        data.about = this._profileAbout.textContent;
        return data;
    }

    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileAbout.textContent = about;
    }
}

export { UserInfo }