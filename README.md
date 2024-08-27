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
- [x] ~~Allow date/time picker for todos~~
- [x] ~~Handle truncation/overflow in todo names~~
- [x] ~~Allow color pickers for todos~~
- [x] ~~Add branding~~
- [x] ~~Allow reordering of project tabs~~
- Handle truncation/overflow in list names
- Auto delete/prune old trashed items based on timestamp
- Add fancy animations/transitions
- Completing todo should cancel reminders
- Add basic user/login functionality
- Add server for DB, users, and email handling
- Add database integration for persistence across devices
- Deploy to website
- Add testing

## Possible Additions

- Add color pickers for lists
- Add date/time to lists
- Allow toggling visibility of completed todos
- Add comments on todos feature
- Allow collapsing lists
- Break up words that are too many characters to fit on a single line
- Allow special behavior when adding links

## Known Bugs

- Improper anchorEl warning in MenuSection (use refs instead?)
