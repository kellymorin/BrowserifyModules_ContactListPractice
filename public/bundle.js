(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contactList = _interopRequireDefault(require("./contactList"));

var _elementFactory = _interopRequireDefault(require("./elementFactory"));

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
A Contact component that displays a person's name, phone number, and address.
*/
const contact = {
  makeContact: something => {
    let name = _elementFactory.default.elementFactory("h2", {
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

    deleteButton.addEventListener("click", () => {
      let eventID = event.target.id.substring(13, 15);

      _contactList.default.deleteListItem(eventID);
    });

    let cardDiv = _elementFactory.default.elementFactory("div", {
      id: `contactCardDiv-${something.id}`
    }, null, name, phoneNumber, address, deleteButton);

    return cardDiv;
  },
  createContactCard: contactInfo => {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(contact.makeContact(contactInfo));

    _contactList.default.addToList(fragment);
  }
};
var _default = contact;
exports.default = _default;

},{"./contactCollection":2,"./contactList":4,"./elementFactory":5}],2:[function(require,module,exports){
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
    return fetch(`http://localhost:8088/contacts/${id}`, {
      method: "DELETE"
    }).then(alert("Your contact information was deleted"));
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
      let streetAddress = document.querySelector("#address").value;
      let cityAddress = document.querySelector("#city").value;
      let zipAddress = document.querySelector("#zip").value;
      let stateAddress = document.querySelector("#state").value;
      contactObj.address = `${streetAddress}, ${cityAddress}, ${stateAddress} ${zipAddress}`;
      console.log(contactObj);

      _contactCollection.default.saveData(contactObj);

      contactForm.clearForm();
    } else {
      console.log("the form is invalid");
    }
  },
  clearForm: () => {
    let name = document.querySelector("#name");
    let phoneNumber = document.querySelector("#phoneNumber");
    let address = document.querySelector("#address");
    let cityAddress = document.querySelector("#city");
    let zipAddress = document.querySelector("#zip");
    let stateAddress = document.querySelector("#state");
    name.value = "";
    phoneNumber.value = "";
    address.value = "";
    cityAddress.value = "";
    zipAddress.value = "";
    stateAddress.value = "";
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

var _contactCollection = _interopRequireDefault(require("./contactCollection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.*/
const contactList = {
  displayExistingCards: entries => {
    let originalFragment = document.createDocumentFragment();
    entries.forEach(entry => {
      originalFragment.appendChild(_contact.default.makeContact(entry));
    });
    contactList.addToList(originalFragment);
  },

  addToList(finalFragment) {
    let displayContact = document.querySelector("#displayContact");
    displayContact.appendChild(finalFragment);
  },

  deleteListItem(id) {
    let deleteCard = document.querySelector(`#contactCardDiv-${id}`);
    let displayContact = document.querySelector("#displayContact");
    displayContact.removeChild(deleteCard);

    _contactCollection.default.deleteData(id);
  }

};
var _default = contactList;
exports.default = _default;

},{"./contact":1,"./contactCollection":2}],5:[function(require,module,exports){
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

    let wrapperDiv = _elementFactory.default.elementFactory("div", {}, null, label, input);

    return wrapperDiv;
  },
  // addressEntryForm: (name, Title)=>{
  //   let label = makeElement.elementFactory("label", {for: name}, Title)
  //   let input = makeElement.elementFactory("input", {type: "text", name: name, id: name, required: true})
  //   let wrapperDiv = makeElement.elementFactory("div", {}, null, label, input)
  //   return wrapperDiv
  // },
  initiateForm: () => {
    let formTitle = _elementFactory.default.elementFactory("h3", {}, "Enter a New Address");

    let nameEntry = makePage.buildForm("name", "Name");
    let phoneNumberEntry = makePage.buildForm("phoneNumber", "Phone Number");
    let streetAddress = makePage.buildForm("address", "Street Address");
    let cityAddress = makePage.buildForm("city", "City");
    let stateAddress = makePage.buildForm("state", "State");
    let zipAddress = makePage.buildForm("zip", "Zip Code");

    let addressEntry = _elementFactory.default.elementFactory("div", {
      id: "addressEntry"
    }, null, streetAddress, cityAddress, stateAddress, zipAddress);

    let submitButton = _elementFactory.default.elementFactory("button", {
      type: "submit",
      id: "submitButton"
    }, "Save Contact Information");

    let form = _elementFactory.default.elementFactory("form", {
      id: "contactEntryForm"
    }, null, formTitle, nameEntry, phoneNumberEntry, addressEntry, submitButton);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3QuanMiLCIuLi9zY3JpcHRzL2NvbnRhY3RDb2xsZWN0aW9uLmpzIiwiLi4vc2NyaXB0cy9jb250YWN0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvY29udGFjdExpc3QuanMiLCIuLi9zY3JpcHRzL2VsZW1lbnRGYWN0b3J5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9wYWdlTGF5b3V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0dBOztBQUNBOztBQUNBOzs7O0FBTEE7OztBQU9BLE1BQU0sT0FBTyxHQUFHO0FBQ2QsRUFBQSxXQUFXLEVBQUcsU0FBRCxJQUFjO0FBQ3pCLFFBQUksSUFBSSxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsSUFBM0IsRUFBaUM7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWpDLEVBQTBELFNBQVMsQ0FBQyxJQUFwRSxDQUFYOztBQUNBLFFBQUksV0FBVyxHQUFHLHdCQUFZLGNBQVosQ0FBMkIsR0FBM0IsRUFBZ0M7QUFBQyxNQUFBLEVBQUUsRUFBRTtBQUFMLEtBQWhDLEVBQTBELFNBQVMsQ0FBQyxXQUFwRSxDQUFsQjs7QUFDQSxRQUFJLE9BQU8sR0FBRyx3QkFBWSxjQUFaLENBQTJCLEdBQTNCLEVBQWdDO0FBQUMsTUFBQSxFQUFFLEVBQUU7QUFBTCxLQUFoQyxFQUE0RCxTQUFTLENBQUMsT0FBdEUsQ0FBZDs7QUFDQSxRQUFJLFlBQVksR0FBRyx3QkFBWSxjQUFaLENBQTJCLE9BQTNCLEVBQW9DO0FBQUMsTUFBQSxJQUFJLEVBQUUsUUFBUDtBQUFpQixNQUFBLEVBQUUsRUFBRyxnQkFBZSxTQUFTLENBQUMsRUFBRyxFQUFsRDtBQUFxRCxNQUFBLEtBQUssRUFBRTtBQUE1RCxLQUFwQyxFQUErSCxJQUEvSCxDQUFuQjs7QUFDQSxJQUFBLFlBQVksQ0FBQyxnQkFBYixDQUE4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QUE4RSxTQUE5RSxFQUF5RixnQkFBekYsRUFBMkcsWUFBM0csRUFBeUgsWUFBekgsQ0FBWDs7QUFDQSxJQUFBLFFBQVEsQ0FBQyxVQUFULENBQW9CLElBQXBCO0FBQ0QsR0E3QmM7QUE4QmYsRUFBQSxVQUFVLEVBQUcsSUFBRCxJQUFRO0FBQ2xCLFFBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFuQjtBQUNBLFFBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLENBQWQ7QUFDQSxJQUFBLFlBQVksQ0FBQyxXQUFiLENBQXlCLElBQXpCO0FBQ0EsSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixZQUFwQjtBQUNEO0FBbkNjLENBQWpCO2VBcUNlLFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKlxuQSBDb250YWN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgcGVyc29uJ3MgbmFtZSwgcGhvbmUgbnVtYmVyLCBhbmQgYWRkcmVzcy5cbiovXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuaW1wb3J0IG1ha2VFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRGYWN0b3J5XCJcbmltcG9ydCBkYXRhYmFzZSBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xuXG5jb25zdCBjb250YWN0ID0ge1xuICBtYWtlQ29udGFjdDogKHNvbWV0aGluZykgPT57XG4gICAgbGV0IG5hbWUgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImgyXCIsIHtpZDogXCJjb250YWN0Q2FyZE5hbWVcIn0sIHNvbWV0aGluZy5uYW1lKVxuICAgIGxldCBwaG9uZU51bWJlciA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwicFwiLCB7aWQ6IFwiY29udGFjdENhcmRQaG9uZVwifSwgc29tZXRoaW5nLnBob25lTnVtYmVyKVxuICAgIGxldCBhZGRyZXNzID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJwXCIsIHtpZDogXCJjb250YWN0Q2FyZEFkZHJlc3NcIn0sIHNvbWV0aGluZy5hZGRyZXNzKVxuICAgIGxldCBkZWxldGVCdXR0b24gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImlucHV0XCIsIHt0eXBlOiBcImJ1dHRvblwiLCBpZDogYGRlbGV0ZUJ1dHRvbi0ke3NvbWV0aGluZy5pZH1gLCB2YWx1ZTogXCJEZWxldGUgQ29udGFjdCBJbmZvcm1hdGlvblwifSwgbnVsbClcbiAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICBsZXQgZXZlbnRJRCA9IGV2ZW50LnRhcmdldC5pZC5zdWJzdHJpbmcoMTMsIDE1KVxuICAgICAgY29udGFjdExpc3QuZGVsZXRlTGlzdEl0ZW0oZXZlbnRJRClcbiAgICB9KVxuICAgIGxldCBjYXJkRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge2lkOiBgY29udGFjdENhcmREaXYtJHtzb21ldGhpbmcuaWR9YH0sIG51bGwsIG5hbWUsIHBob25lTnVtYmVyLCBhZGRyZXNzLCBkZWxldGVCdXR0b24pXG4gICAgcmV0dXJuIGNhcmREaXZcbiAgfSxcblxuICBjcmVhdGVDb250YWN0Q2FyZDogKGNvbnRhY3RJbmZvKSA9PiB7XG4gICAgICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNvbnRhY3QubWFrZUNvbnRhY3QoY29udGFjdEluZm8pKTtcbiAgICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChmcmFnbWVudClcbiAgICB9LFxufVxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCIsIi8qXG5BIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudCB0aGF0IGxvYWRzIGV4aXN0aW5nIGNvbnRhY3RzIGZyb20gc3RvcmFnZSwgYW5kIHNhdmVzIG5ldyBvbmVzLiBFYWNoIG5ldyBjb250YWN0IHNob3VsZCBoYXZlIGFuIGF1dG8tZ2VuZXJhdGVkIGlkZW50aWZpZXIuXG4qL1xuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiXG5pbXBvcnQgY29udGFjdExpc3QgZnJvbSBcIi4vY29udGFjdExpc3RcIlxuXG5jb25zdCBkYXRhYmFzZSA9IHtcbiAgZ2V0RGF0YTogKCkgPT57XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzXCIpXG4gICAgLnRoZW4oKGNvbnRhY3RzKT0+IGNvbnRhY3RzLmpzb24oKSlcbiAgICAudGhlbihhbGxDb250YWN0cyA9PiAoY29udGFjdExpc3QuZGlzcGxheUV4aXN0aW5nQ2FyZHMoYWxsQ29udGFjdHMpKSlcbiAgfSxcblxuICBzYXZlRGF0YTogKGNvbnRhY3RFbnRyeSk9PntcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvY29udGFjdHNcIiwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250YWN0RW50cnkpXG4gICAgfSlcbiAgICAudGhlbihlbnRyeUluZm8gPT4gZW50cnlJbmZvLmpzb24oKSlcbiAgICAudGhlbihjb250YWN0SW5mbyA9PiAoY29udGFjdC5jcmVhdGVDb250YWN0Q2FyZChjb250YWN0SW5mbykpKVxuICB9LFxuXG4gIGRlbGV0ZURhdGE6IChpZCkgPT4ge1xuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2NvbnRhY3RzLyR7aWR9YCx7XG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICB9KVxuICAgIC50aGVuKGFsZXJ0KFwiWW91ciBjb250YWN0IGluZm9ybWF0aW9uIHdhcyBkZWxldGVkXCIpKVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBkYXRhYmFzZSIsIi8qXG5BIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCJcblxuY29uc3QgY29udGFjdEZvcm0gPSB7XG4gIGZvcm1TdWJtaXQ6IChldmVudCk9PntcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKVxuICAgIGlmKGZvcm0uY2hlY2tWYWxpZGl0eSgpPT09dHJ1ZSl7XG4gICAgICBsZXQgY29udGFjdE9iaiA9IHt9XG4gICAgICBjb250YWN0T2JqLm5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIikudmFsdWVcbiAgICAgIGNvbnRhY3RPYmoucGhvbmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lTnVtYmVyXCIpLnZhbHVlXG4gICAgICBsZXQgc3RyZWV0QWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkcmVzc1wiKS52YWx1ZVxuICAgICAgbGV0IGNpdHlBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaXR5XCIpLnZhbHVlXG4gICAgICBsZXQgemlwQWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjemlwXCIpLnZhbHVlXG4gICAgICBsZXQgc3RhdGVBZGRyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdGF0ZVwiKS52YWx1ZVxuICAgICAgY29udGFjdE9iai5hZGRyZXNzID0gYCR7c3RyZWV0QWRkcmVzc30sICR7Y2l0eUFkZHJlc3N9LCAke3N0YXRlQWRkcmVzc30gJHt6aXBBZGRyZXNzfWBcbiAgICAgIGNvbnNvbGUubG9nKGNvbnRhY3RPYmopXG4gICAgICBkYXRhYmFzZS5zYXZlRGF0YShjb250YWN0T2JqKVxuICAgICAgY29udGFjdEZvcm0uY2xlYXJGb3JtKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwidGhlIGZvcm0gaXMgaW52YWxpZFwiKVxuICAgIH1cbiAgfSxcbiAgY2xlYXJGb3JtOigpPT57XG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIilcbiAgICBsZXQgcGhvbmVOdW1iZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bob25lTnVtYmVyXCIpXG4gICAgbGV0IGFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZHJlc3NcIilcbiAgICBsZXQgY2l0eUFkZHJlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NpdHlcIilcbiAgICBsZXQgemlwQWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjemlwXCIpXG4gICAgbGV0IHN0YXRlQWRkcmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGVcIilcbiAgICBuYW1lLnZhbHVlID0gXCJcIlxuICAgIHBob25lTnVtYmVyLnZhbHVlID0gXCJcIlxuICAgIGFkZHJlc3MudmFsdWUgPSBcIlwiXG4gICAgY2l0eUFkZHJlc3MudmFsdWUgPSBcIlwiXG4gICAgemlwQWRkcmVzcy52YWx1ZSA9IFwiXCJcbiAgICBzdGF0ZUFkZHJlc3MudmFsdWUgPSBcIlwiXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3RGb3JtIiwiLypBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuKi9cblxuaW1wb3J0IGNvbnRhY3QgZnJvbSBcIi4vY29udGFjdFwiO1xuaW1wb3J0IGRhdGFiYXNlIGZyb20gXCIuL2NvbnRhY3RDb2xsZWN0aW9uXCI7XG5cblxuY29uc3QgY29udGFjdExpc3QgPSB7XG4gIGRpc3BsYXlFeGlzdGluZ0NhcmRzOiAoZW50cmllcykgPT57XG4gICAgbGV0IG9yaWdpbmFsRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgb3JpZ2luYWxGcmFnbWVudC5hcHBlbmRDaGlsZChjb250YWN0Lm1ha2VDb250YWN0KGVudHJ5KSlcbiAgICB9KVxuICAgIGNvbnRhY3RMaXN0LmFkZFRvTGlzdChvcmlnaW5hbEZyYWdtZW50KVxuICB9LFxuICBhZGRUb0xpc3QgKGZpbmFsRnJhZ21lbnQpe1xuICAgIGxldCBkaXNwbGF5Q29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheUNvbnRhY3RcIilcbiAgICBkaXNwbGF5Q29udGFjdC5hcHBlbmRDaGlsZChmaW5hbEZyYWdtZW50KVxuICB9LFxuICBkZWxldGVMaXN0SXRlbShpZCl7XG4gICAgbGV0IGRlbGV0ZUNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29udGFjdENhcmREaXYtJHtpZH1gKVxuICAgIGxldCBkaXNwbGF5Q29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGlzcGxheUNvbnRhY3RcIilcbiAgICBkaXNwbGF5Q29udGFjdC5yZW1vdmVDaGlsZChkZWxldGVDYXJkKVxuICAgIGRhdGFiYXNlLmRlbGV0ZURhdGEoaWQpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBjb250YWN0TGlzdCIsIlxuY29uc3QgbWFrZUVsZW1lbnQgPSB7XG4gIGVsZW1lbnRGYWN0b3J5OiAoZWwsIGF0dHJpYnV0ZXNPYmosIGNvbnRlbnQsIC4uLmNoaWxkcmVuKT0+e1xuICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbClcbiAgICAvLyBTZXQgQXR0cmlidXRlc1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cmlidXRlc09iail7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJ1dGVzT2JqW2F0dHJdKVxuICAgIH1cbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gY29udGVudCB8fCBudWxsXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VFbGVtZW50IiwiLypcbkluIG1haW4uanMsIGltcG9ydCB0aGUgQ29udGFjdExpc3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdEZvcm0gY29tcG9uZW50LlxuKi9cblxuaW1wb3J0IGNvbnRhY3RGb3JtIGZyb20gXCIuL2NvbnRhY3RGb3JtXCJcbmltcG9ydCBkYXRhYmFzZSBmcm9tIFwiLi9jb250YWN0Q29sbGVjdGlvblwiO1xuaW1wb3J0IG1ha2VQYWdlIGZyb20gXCIuL3BhZ2VMYXlvdXRcIlxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpe1xuICBtYWtlUGFnZS5pbml0aWF0ZUZvcm0oKTtcbiAgZGF0YWJhc2UuZ2V0RGF0YSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KT0+IGNvbnRhY3RGb3JtLmZvcm1TdWJtaXQoZXZlbnQpKVxufVxuXG5cbiIsImltcG9ydCBtYWtlRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50RmFjdG9yeVwiXG5cbmNvbnN0IG1ha2VQYWdlID0ge1xuICBidWlsZEZvcm06IChuYW1lLCBUaXRsZSkgPT4ge1xuICAgIGxldCBsYWJlbCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwibGFiZWxcIiwge2ZvcjogbmFtZX0sIFRpdGxlKVxuICAgIGxldCBpbnB1dCA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaW5wdXRcIiwge3R5cGU6IFwidGV4dFwiLCBuYW1lOiBuYW1lLCBpZDogbmFtZSwgcmVxdWlyZWQ6IHRydWV9KVxuICAgIGxldCB3cmFwcGVyRGl2ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge30sIG51bGwsIGxhYmVsLCBpbnB1dClcbiAgICByZXR1cm4gd3JhcHBlckRpdlxuICB9LFxuICAvLyBhZGRyZXNzRW50cnlGb3JtOiAobmFtZSwgVGl0bGUpPT57XG4gIC8vICAgbGV0IGxhYmVsID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJsYWJlbFwiLCB7Zm9yOiBuYW1lfSwgVGl0bGUpXG4gIC8vICAgbGV0IGlucHV0ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJpbnB1dFwiLCB7dHlwZTogXCJ0ZXh0XCIsIG5hbWU6IG5hbWUsIGlkOiBuYW1lLCByZXF1aXJlZDogdHJ1ZX0pXG4gIC8vICAgbGV0IHdyYXBwZXJEaXYgPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImRpdlwiLCB7fSwgbnVsbCwgbGFiZWwsIGlucHV0KVxuICAvLyAgIHJldHVybiB3cmFwcGVyRGl2XG4gIC8vIH0sXG5cbiAgaW5pdGlhdGVGb3JtOiAoKSA9PiB7XG4gICAgbGV0IGZvcm1UaXRsZSA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiaDNcIiwge30sIFwiRW50ZXIgYSBOZXcgQWRkcmVzc1wiKVxuICAgIGxldCBuYW1lRW50cnkgPSBtYWtlUGFnZS5idWlsZEZvcm0oXCJuYW1lXCIsIFwiTmFtZVwiKVxuICAgIGxldCBwaG9uZU51bWJlckVudHJ5ID0gbWFrZVBhZ2UuYnVpbGRGb3JtKFwicGhvbmVOdW1iZXJcIiwgXCJQaG9uZSBOdW1iZXJcIilcbiAgICBsZXQgc3RyZWV0QWRkcmVzcyA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImFkZHJlc3NcIiwgXCJTdHJlZXQgQWRkcmVzc1wiKVxuICAgIGxldCBjaXR5QWRkcmVzcyA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcImNpdHlcIiwgXCJDaXR5XCIpXG4gICAgbGV0IHN0YXRlQWRkcmVzcyA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcInN0YXRlXCIsIFwiU3RhdGVcIilcbiAgICBsZXQgemlwQWRkcmVzcyA9IG1ha2VQYWdlLmJ1aWxkRm9ybShcInppcFwiLCBcIlppcCBDb2RlXCIpXG5cbiAgICBsZXQgYWRkcmVzc0VudHJ5ID0gbWFrZUVsZW1lbnQuZWxlbWVudEZhY3RvcnkoXCJkaXZcIiwge2lkOiBcImFkZHJlc3NFbnRyeVwifSwgbnVsbCwgc3RyZWV0QWRkcmVzcywgY2l0eUFkZHJlc3MsIHN0YXRlQWRkcmVzcywgemlwQWRkcmVzcylcblxuXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IG1ha2VFbGVtZW50LmVsZW1lbnRGYWN0b3J5KFwiYnV0dG9uXCIsIHt0eXBlOiBcInN1Ym1pdFwiLCBpZDogXCJzdWJtaXRCdXR0b25cIn0sIFwiU2F2ZSBDb250YWN0IEluZm9ybWF0aW9uXCIpXG4gICAgbGV0IGZvcm0gPSBtYWtlRWxlbWVudC5lbGVtZW50RmFjdG9yeShcImZvcm1cIiwge2lkOiBcImNvbnRhY3RFbnRyeUZvcm1cIn0sIG51bGwsIGZvcm1UaXRsZSwgbmFtZUVudHJ5LCBwaG9uZU51bWJlckVudHJ5LCBhZGRyZXNzRW50cnksIHN1Ym1pdEJ1dHRvbilcbiAgICBtYWtlUGFnZS5hcHBlbmRGb3JtKGZvcm0pXG4gIH0sXG4gIGFwcGVuZEZvcm06IChmb3JtKT0+e1xuICAgIGxldCBmb3JtRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgbGV0IGZvcm1EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm1EaXNwbGF5XCIpXG4gICAgZm9ybUZyYWdtZW50LmFwcGVuZENoaWxkKGZvcm0pXG4gICAgZm9ybURpdi5hcHBlbmRDaGlsZChmb3JtRnJhZ21lbnQpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQYWdlIl19
