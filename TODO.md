# TO DO

~~Set up user auth~~ ([theory](https://www.youtube.com/watch?v=J6NLw0N25UM))
1. ~~Set up user login~~
    - ~~HTML~~
    - ~~POST request, check against Login.DB~~
    - ~~SHA256 hashing + matching~~
    - ~~Redirect to dashboard~~
    - ~~Generate token with auth level~~
1. Set up file auth
    - Format file
    - Get auth level from Token.DB
    - Compare auth level to minimum auth level of file
    - Handle conditions (i.e. 200 OK, 401 UNAUTHORISED)
    - Auth levels work from 0 --> x (0=guest, x=admin)
1. Automated mailing
    - I'll figure this out later
1. Other features
    - Attendance
    - Quick links
1. Docker integration
1. Raspberry Pi integration