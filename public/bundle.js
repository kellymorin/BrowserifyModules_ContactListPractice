(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList"));

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A Contact component that displays a person's name, phone number, and address.
*/
const contact = {
  makeContact: something => {
    let title = _elementFactory.default.elementFactory("h1", {
      id: "contactCardtitle"
    }, "Contact Card");

    let name = _elementFactory.default.elementFactory("p", {
      id: "contactCardName"
    }, something.name);

    let phoneNumber = _elementFactory.default.elementFactory("p", {
      id: "contactCardPhone"
    }, something.phoneNumber);

    let address = _elementFactory.default.elementFactory("p", {
      id: "contactCardAddress"
    }, something.address);

    let deleteButton = _elementFactory.default.elementFactory("input", {
      type: "button",
      id: `deleteButton-${something.id}`,
      value: "Delete Contact Information"
    }, null);

    let cardDiv = _elementFactory.default.elementFactory("div", {
      id: `contactCardDiv-${something.id}`
    }, null, title, name, phoneNumber, address, deleteButton);

    contact.deleteButton();
    return cardDiv;
  },
  createContactCard: contactInfo => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(contact.makeContact(contactInfo));

    _contactList.default.addToList(fragment);
  },
  deleteButton: () => {
    let button = document.querySelectorAll("button");
    button.forEach(button => {
      let buttonID = button.id; // .substring(12, 15)

      console.log(buttonID);
    });
  }
};
var _default = contact;
exports.default = _default;

},{"./contactList":4,"./elementFactory":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact"));

var _contactList = _interopRequireDefault(require("./contactList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A ContactCollection component that loads existing contacts from storage, and saves new ones. Each new contact should have an auto-generated identifier.
*/
const database = {
  getData: () => {
    return fetch("http://localhost:8088/contacts").then(contacts => contacts.json()).then(allContacts => _contactList.default.displayExistingCards(allContacts));
  },
  saveData: contactEntry => {
    return fetch("http://localhost:8088/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactEntry)
    }).then(entryInfo => entryInfo.json()).then(contactInfo => _contact.default.createContactCard(contactInfo));
  },
  deleteData: id => {
    return fetch(`http://localhost:8088/${id}`);
  }
};
var _default = database;
exports.default = _default;

},{"./contact":1,"./contactList":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
*/
const contactForm = {
  formSubmit: event => {
    event.preventDefault();
    let form = document.querySelector("form");

    if (form.checkValidity() === true) {
      let contactObj = {};
      contactObj.name = document.querySelector("#name").value;
      contactObj.phoneNumber = document.querySelector("#phoneNumber").value;
      contactObj.address = document.querySelector("#address").value;

      _contactCollection.default.saveData(contactObj);
    } else {
      console.log("the form is invalid");
    }
  }
};
var _default = contactForm;
exports.default = _default;

},{"./contactCollection":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contact = _interopRequireDefault(require("./contact"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.*/
const contactList = {
  displayExistingCards: entries => {
    let originalFragment = document.createDocumentFragment();
    entries.forEach(entry => {
      originalFragment.appendChild(_contact.default.makeContact(entry));
    });
    contactList.addToList(originalFragment); // let deleteButton= document.querySelector("#deleteButton")
    // console.log(deleteButton)
    // deleteButton.addEventListener("click", (selectedButton)=>{
    //   ID = selectedButton.target.id.substring(12,30);
    //   console.log(ID)
    // })
  },

  addToList(finalFragment) {
    let displayContact = document.querySelector("#displayContact");
    displayContact.appendChild(finalFragment); // deleteButton.addEventListener("click", (selectedButton)=>{
    //   ID = selectedButton.target.id.substring(12,30);
    //   console.log(ID)
    // })
  }

};
var _default = contactList;
exports.default = _default;

},{"./contact":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const makeElement = {
  elementFactory: (el, attributesObj, content, ...children) => {
    let element = document.createElement(el); // Set Attributes

    for (let attr in attributesObj) {
      element.setAttribute(attr, attributesObj[attr]);
    }

    element.textContent = content || null;
    children.forEach(child => {
      element.appendChild(child);
    });
    return element;
  }
};
var _default = makeElement;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _contactForm = _interopRequireDefault(require("./contactForm"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

var _pageLayout = _interopRequireDefault(require("./pageLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
In main.js, import the ContactList component and the ContactForm component.
*/
if (document.readyState === "loading") {
  _pageLayout.default.initiateForm();

  _contactCollection.default.getData();

  document.querySelector("#submitButton").addEventListener("click", event => _contactForm.default.formSubmit(event));
}

},{"./contactCollection":2,"./contactForm":3,"./pageLayout":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePage = {
  buildForm: (name, Title) => {
    let label = _elementFactory.default.elementFactory("label", {
      for: name
    }, Title);

    let input = _elementFactory.default.elementFactory("input", {
      type: "text",
      name: name,
      id: name,
      required: true
    });

    let fieldset = _elementFactory.default.elementFactory("fieldset", {}, null, label, input);

    return fieldset;
  },
  initiateForm: () => {
    let nameEntry = makePage.buildForm("name", "Name");
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number");
    let addressEntry = makePage.buildForm("address", "Street Address");

    let submitButton = _elementFactory.default.elementFactory("button", {
      type: "submit",
      id: "submitButton"
    }, "Save Contact Information");

    let form = _elementFactory.default.elementFactory("form", {}, null, nameEntry, phoneNumberEntry, addressEntry, submitButton);

    makePage.appendForm(form);
  },
  appendForm: form => {
    let formFragment = document.createDocumentFragment();
    let formDiv = document.querySelector("#formDisplay");
    formFragment.appendChild(form);
    formDiv.appendChild(formFragment);
  }
};
var _default = makePage;
exports.default = _default;

},{"./elementFactory":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9wYWdlTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0dBOztBQUNBOzs7O0FBSkE7OztBQU1BLE1BQU0sT0FBTyxHQUFHO0FBQ2QsRUFBQSxXQUFXLEVBQUcsU0FBRCxJQUFjO0FBQ3pCLFFBQUksS0FBSyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWpDLEVBQTJELGNBQTNELENBQVo7O0FBQ0EsUUFBSSxJQUFJLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBeUQsU0FBUyxDQUFDLElBQW5FLENBQVg7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsd0JBQVksY0FBWixDQUEyQixHQUEzQixFQUFnQztBQUFDLE1BQUEsRUFBRSxFQUFFO0FBQUwsS0FBaEMsRUFBMEQsU0FBUyxDQUFDLFdBQXBFLENBQWxCOztBQUNBLFFBQUksT0FBTyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWhDLEVBQTRELFNBQVMsQ0FBQyxPQUF0RSxDQUFkOztBQUNBLFFBQUksWUFBWSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsT0FBM0IsRUFBb0M7QUFBQyxNQUFBLElBQUksRUFBRSxRQUFQO0FBQWlCLE1BQUEsRUFBRSxFQUFHLGdCQUFlLFNBQVMsQ0FBQyxF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QUFULENBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLENBQWhCO0FBQ0EsUUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsU0FBVCxDQUFtQixhQUFuQixFQUFrQyxjQUFsQyxDQUF2QjtBQUNBLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFULENBQW1CLFNBQW5CLEVBQThCLGdCQUE5QixDQUFuQjs7QUFDQSxRQUFJLFlBQVksR0FBRyx3QkFBWSxjQUFaLENBQTJCLFFBQTNCLEVBQXFDO0FBQUMsTUFBQSxJQUFJLEVBQUUsUUFBUDtBQUFpQixNQUFBLEVBQUUsRUFBRTtBQUFyQixLQUFyQyxFQUEyRSwwQkFBM0UsQ0FBbkI7O0FBQ0EsUUFBSSxJQUFJLEdBQUcsd0JBQVksY0FBWixDQUEyQixNQUEzQixFQUFtQyxFQUFuQyxFQUF1QyxJQUF2QyxFQUE2QyxTQUE3QyxFQUF3RCxnQkFBeEQsRUFBMEUsWUFBMUUsRUFBd0YsWUFBeEYsQ0FBWDs7QUFDQSxJQUFBLFFBQVEsQ0FBQyxVQUFULENBQW9CLElBQXBCO0FBQ0QsR0FmYztBQWdCZixFQUFBLFVBQVUsRUFBRyxJQUFELElBQVE7QUFDbEIsUUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLHNCQUFULEVBQW5CO0FBQ0EsUUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBZDtBQUNBLElBQUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsSUFBekI7QUFDQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLFlBQXBCO0FBQ0Q7QUFyQmMsQ0FBakI7ZUF1QmUsUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qXG5BIENvbnRhY3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBwZXJzb24ncyBuYW1lLCBwaG9uZSBudW1iZXIsIGFuZCBhZGRyZXNzLlxuKi9cbmltcG9ydCBjb250YWN0TGlzdCBmcm9tIFwiLi9jb250YWN0TGlzdFwiXG5pbXBvcnQgbWFrZUVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudEZhY3RvcnlcIlxuXG5jb25zdCBjb250YWN0ID0ge1xuICBtYWtlQ29udGFjdDogKHNvbWV0aGluZykgPT57XG4gICAgbGV0IHRpdGxlID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJoMVwiLCB7aWQ6IFwiY29udGFjdENhcmR0aXRsZVwifSwgXCJDb250YWN0IENhcmRcIilcbiAgICBsZXQgbmFtZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7aWQ6IFwiY29udGFjdENhcmROYW1lXCJ9LCBzb21ldGhpbmcubmFtZSlcbiAgICBsZXQgcGhvbmVOdW1iZXIgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcInBcIiwge2lkOiBcImNvbnRhY3RDYXJkUGhvbmVcIn0sIHNvbWV0aGluZy5waG9uZU51bWJlcilcbiAgICBsZXQgYWRkcmVzcyA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7aWQ6IFwiY29udGFjdENhcmRBZGRyZXNzXCJ9LCBzb21ldGhpbmcuYWRkcmVzcylcbiAgICBsZXQgZGVsZXRlQnV0dG9uID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogXCJidXR0b25cIiwgaWQ6IGBkZWxldGVCdXR0b24tJHtzb21ldGhpbmcuaWR9YCwgdmFsdWU6IFwiRGVsZXRlIENvbnRhY3QgSW5mb3JtYXRpb25cIn0sIG51bGwpXG4gICAgbGV0IGNhcmREaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7aWQ6IGBjb250YWN0Q2FyZERpdi0ke3NvbWV0aGluZy5pZH1gfSwgbnVsbCwgdGl0bGUsIG5hbWUsIHBob25lTnVtYmVyLCBhZGRyZXNzLCBkZWxldGVCdXR0b24pXG4gICAgY29udGFjdC5kZWxldGVCdXR0b24oKVxuICAgIHJldHVybiBjYXJkRGl2XG4gIH0sXG5cbiAgY3JlYXRlQ29udGFjdENhcmQ6IChjb250YWN0SW5mbykgPT4ge1xuICAgICAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGNvbnRhY3RJbmZvKSk7XG4gICAgICBjb250YWN0TGlzdC5hZGRUb0xpc3QoZnJhZ21lbnQpXG4gICAgfSxcblxuICBkZWxldGVCdXR0b246ICgpID0+IHtcbiAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImJ1dHRvblwiKVxuICAgIGJ1dHRvbi5mb3JFYWNoKChidXR0b24pPT4ge1xuICAgICAgbGV0IGJ1dHRvbklEID0gYnV0dG9uLmlkXG4gICAgICAvLyAuc3Vic3RyaW5nKDEyLCAxNSlcbiAgICAgIGNvbnNvbGUubG9nKGJ1dHRvbklEKVxuICAgIH0pXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3QiLCIvKlxuQSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQgdGhhdCBsb2FkcyBleGlzdGluZyBjb250YWN0cyBmcm9tIHN0b3JhZ2UsIGFuZCBzYXZlcyBuZXcgb25lcy4gRWFjaCBuZXcgY29udGFjdCBzaG91bGQgaGF2ZSBhbiBhdXRvLWdlbmVyYXRlZCBpZGVudGlmaWVyLlxuKi9cbmltcG9ydCBjb250YWN0IGZyb20gXCIuL2NvbnRhY3RcIlxuaW1wb3J0IGNvbnRhY3RMaXN0IGZyb20gXCIuL2NvbnRhY3RMaXN0XCJcblxuY29uc3QgZGF0YWJhc2UgPSB7XG4gIGdldERhdGE6ICgpID0+e1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9jb250YWN0c1wiKVxuICAgIC50aGVuKChjb250YWN0cyk9PiBjb250YWN0cy5qc29uKCkpXG4gICAgLnRoZW4oYWxsQ29udGFjdHMgPT4gKGNvbnRhY3RMaXN0LmRpc3BsYXlFeGlzdGluZ0NhcmRzKGFsbENvbnRhY3RzKSkpXG4gIH0sXG5cbiAgc2F2ZURhdGE6IChjb250YWN0RW50cnkpPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGFjdEVudHJ5KVxuICAgIH0pXG4gICAgLnRoZW4oZW50cnlJbmZvID0+IGVudHJ5SW5mby5qc29uKCkpXG4gICAgLnRoZW4oY29udGFjdEluZm8gPT4gKGNvbnRhY3QuY3JlYXRlQ29udGFjdENhcmQoY29udGFjdEluZm8pKSlcbiAgfSxcblxuICBkZWxldGVEYXRhOiAoaWQpID0+IHtcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2lkfWApXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGRhdGFiYXNlIiwiLypcbkEgQ29udGFjdEZvcm0gY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXG4qL1xuXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSBcIi4vY29udGFjdENvbGxlY3Rpb25cIlxuXG5jb25zdCBjb250YWN0Rm9ybSA9IHtcbiAgZm9ybVN1Ym1pdDogKGV2ZW50KT0+e1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBsZXQgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpXG4gICAgaWYoZm9ybS5jaGVja1ZhbGlkaXR5KCk9PT10cnVlKXtcbiAgICAgIGxldCBjb250YWN0T2JqID0ge31cbiAgICAgIGNvbnRhY3RPYmoubmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKS52YWx1ZVxuICAgICAgY29udGFjdE9iai5waG9uZU51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGhvbmVOdW1iZXJcIikudmFsdWVcbiAgICAgIGNvbnRhY3RPYmouYWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkcmVzc1wiKS52YWx1ZVxuICAgICAgZGF0YWJhc2Uuc2F2ZURhdGEoY29udGFjdE9iailcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ0aGUgZm9ybSBpcyBpbnZhbGlkXCIpXG4gICAgfVxuICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdEZvcm0iLCIvKkEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC4qL1xuXG5pbXBvcnQgY29udGFjdCBmcm9tIFwiLi9jb250YWN0XCI7XG5cblxuY29uc3QgY29udGFjdExpc3QgPSB7XG4gIGRpc3BsYXlFeGlzdGluZ0NhcmRzOiAoZW50cmllcykgPT57XG4gICAgbGV0IG9yaWdpbmFsRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgb3JpZ2luYWxGcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGVudHJ5KSlcbiAgICB9KVxuICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChvcmlnaW5hbEZyYWdtZW50KVxuICAgIC8vIGxldCBkZWxldGVCdXR0b249IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVsZXRlQnV0dG9uXCIpXG4gICAgLy8gY29uc29sZS5sb2coZGVsZXRlQnV0dG9uKVxuICAgIC8vIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKHNlbGVjdGVkQnV0dG9uKT0+e1xuICAgIC8vICAgSUQgPSBzZWxlY3RlZEJ1dHRvbi50YXJnZXQuaWQuc3Vic3RyaW5nKDEyLDMwKTtcbiAgICAvLyAgIGNvbnNvbGUubG9nKElEKVxuICAgIC8vIH0pXG4gIH0sXG4gIGFkZFRvTGlzdCAoZmluYWxGcmFnbWVudCl7XG4gICAgbGV0IGRpc3BsYXlDb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkaXNwbGF5Q29udGFjdFwiKVxuICAgIGRpc3BsYXlDb250YWN0LmFwcGVuZENoaWxkKGZpbmFsRnJhZ21lbnQpXG4gICAgLy8gZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoc2VsZWN0ZWRCdXR0b24pPT57XG4gICAgLy8gICBJRCA9IHNlbGVjdGVkQnV0dG9uLnRhcmdldC5pZC5zdWJzdHJpbmcoMTIsMzApO1xuICAgIC8vICAgY29uc29sZS5sb2coSUQpXG4gICAgLy8gfSlcbiAgfSxcbn1cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RMaXN0IiwiXG5jb25zdCBtYWtlRWxlbWVudCA9IHtcbiAgZWxlbWVudEZhY3Rvcnk6IChlbCwgYXR0cmlidXRlc09iaiwgY29udGVudCwgLi4uY2hpbGRyZW4pPT57XG4gICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsKVxuICAgIC8vIFNldCBBdHRyaWJ1dGVzXG4gICAgZm9yIChsZXQgYXR0ciBpbiBhdHRyaWJ1dGVzT2JqKXtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnV0ZXNPYmpbYXR0cl0pXG4gICAgfVxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBjb250ZW50IHx8IG51bGxcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZUVsZW1lbnQiLCIvKlxuSW4gbWFpbi5qcywgaW1wb3J0IHRoZSBDb250YWN0TGlzdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Rm9ybSBjb21wb25lbnQuXG4qL1xuXG5pbXBvcnQgY29udGFjdEZvcm0gZnJvbSBcIi4vY29udGFjdEZvcm1cIlxuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5pbXBvcnQgbWFrZVBhZ2UgZnJvbSBcIi4vcGFnZUxheW91dFwiXG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImxvYWRpbmdcIil7XG4gIG1ha2VQYWdlLmluaXRpYXRlRm9ybSgpO1xuICBkYXRhYmFzZS5nZXREYXRhKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpPT4gY29udGFjdEZvcm0uZm9ybVN1Ym1pdChldmVudCkpXG59XG5cblxuIiwiaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcblxuY29uc3QgbWFrZVBhZ2UgPSB7XG4gIGJ1aWxkRm9ybTogKG5hbWUsIFRpdGxlKSA9PiB7XG4gICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgVGl0bGUpXG4gICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIG5hbWU6IG5hbWUsIGlkOiBuYW1lLCByZXF1aXJlZDogdHJ1ZX0pXG4gICAgbGV0IGZpZWxkc2V0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJmaWVsZHNldFwiLCB7fSwgbnVsbCwgbGFiZWwsIGlucHV0KVxuICAgIHJldHVybiBmaWVsZHNldFxuICB9LFxuXG4gIGluaXRpYXRlRm9ybTogKCkgPT4ge1xuICAgIGxldCBuYW1lRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJuYW1lXCIsIFwiTmFtZVwiKVxuICAgIGxldCBwaG9uZU51bWJlckVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwicGhvbmVOdW1iZXJcIiwgXCJQaG9uZSBOdW1iZXJcIilcbiAgICBsZXQgYWRkcmVzc0VudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwiYWRkcmVzc1wiLCBcIlN0cmVldCBBZGRyZXNzXCIpXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBpZDogXCJzdWJtaXRCdXR0b25cIn0sIFwiU2F2ZSBDb250YWN0IEluZm9ybWF0aW9uXCIpXG4gICAgbGV0IGZvcm0gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZvcm1cIiwge30sIG51bGwsIG5hbWVFbnRyeSwgcGhvbmVOdW1iZXJFbnRyeSwgYWRkcmVzc0VudHJ5LCBzdWJtaXRCdXR0b24pXG4gICAgbWFrZVBhZ2UuYXBwZW5kRm9ybShmb3JtKVxuICB9LFxuICBhcHBlbmRGb3JtOiAoZm9ybSk9PntcbiAgICBsZXQgZm9ybUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGxldCBmb3JtRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtRGlzcGxheVwiKVxuICAgIGZvcm1GcmFnbWVudC5hcHBlbmRDaGlsZChmb3JtKVxuICAgIGZvcm1EaXYuYXBwZW5kQ2hpbGQoZm9ybUZyYWdtZW50KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBtYWtlUGFnZSJdfQ==
