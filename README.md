# TaskVolt

Local todo app running on react/redux toolkit.

This is an ongoing experiment with the purpose of eventually creating an embeddable todo list with
extensible functionality to be dictated by the user. Another potentiality is the
democratization/decentralization of the todo list concept. Details to be fleshed out in a road map
when available.

## Running Locally

1. `git clone https://github.com/gabrielliwerant/taskvolt.git`
1. `npm install`
1. `npm start`
1. Navigate to `http://localhost:8080`

## Roadmap

- [x] ~~Add project level to collect lists~~
- [x] ~~Allow dragging items between lists~~
- [x] ~~Improve UX around editing text~~
- [x] ~~Allow viewing trashed items~~
- [x] ~~Add tooltips~~
- [x] ~~Improve project tab UX (and ability to click without entering edit mode)~~
- [x] ~~Allow exporting data~~
- [x] ~~Allow importing data~~
- [x] ~~Handle truncation/overflow in todo names~~
- Handle truncation/overflow in list names
- Add basic user/login functionality
- Add database integration for persistence across devices
- Deploy to website
- Allow color pickers for todos/lists
- Allow date/time picker for todos
- Handle truncation/overflow in todos/notes
- Auto delete/prune old trashed items based on timestamp
- Add fancy animations/transitions
- Allow toggling visibility of completed todos
- Allow reordering of project tabs
- Add note type feature
- Allow marking as important
- Add branding
- Add testing
- Allow collapsing lists

## Known Bugs

- `Tooltip` for the `TrashTab` blocks clickable surface
- Change size of placeholders when in edit mode
- Allow placeholders to swamp positions
- Todos with text past 2 lines cause display issues with date/time
