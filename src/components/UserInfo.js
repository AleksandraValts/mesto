class UserInfo {
    constructor({selectorName, selectorAbout, selectorAvatar}) {
        this._profileName = document.querySelector(selectorName);
        this._profileAbout = document.querySelector(selectorAbout);
        this._profileAvatar = document.querySelector(selectorAvatar);
    }

    getUserInfo() {
        const data = {};
        data.name = this._profileName.textContent;
        data.about = this._profileAbout.textContent;
        return data;
    }

    setUserInfo({name, about, avatar}) {
        this._profileName.textContent = name; 
        this._profileAbout.textContent = about; 
        if (avatar) {
          this._profileAvatar.src = avatar;
        } 
    }

   setAvatarLink(link) {
      this._profileAvatar.src = link;
    }
}

export { UserInfo }