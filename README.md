# TaskVolt

Local todo app running on react/redux toolkit.

This is an ongoing experiment with the purpose of eventually creating an embeddable todo list with extensible functionality to be dictated by the user. Another potentiality is the democratization/decentralization of the todo list concept. Details to be fleshed out in a road map when available.

## Running Locally

1. `git clone https://github.com/gabrielliwerant/taskvolt.git`
1. `npm install`
1. `npm start`
1. Navigate to `http://localhost:8080`

## Roadmap

- [x] ~~Add project level to collect lists~~
- [x] ~~Allow dragging items between lists~~
- [x] ~~Improve UX around editing text~~
- Allow collapsing lists
- Add tooltips
- Improve project tab UX (more space to click without entering edit mode)
- Allow toggling visibility of completed todos
- Allow reordering of project tabs
- Allow exporting data
- Allow importing data
- Allow viewing trashed items
- Add note type feature
- Allow marking as important
- Add branding
- Add testing
- Add basic user/login functionality
- Add database integration for persistence across devices
- Deploy to website
- Allow color pickers for todos/lists
- Allow date/time picker for todos
- Handle truncation/overflow in todos/notes

## Known Bugs

- Deleting a project tab to the left of the add project tab results in add tab being active
- z-index of todos when switching between lists does not work properly
