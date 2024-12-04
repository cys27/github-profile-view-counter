# GitHub Profile View Counter

This is a simplified version of the [Antonkomarev - GitHub Profile View Counter](https://github.com/antonkomarev/github-profile-views-counter).

This application tracks the number of views on a GitHub user's profile and displays the count in a dynamically generated SVG badge. The badge shows the current view count for a given user, which is updated each time their profile is accessed. The view count is stored locally, and users can customize the badge's color by providing a valid hex color code. If no color is specified, a default color is used.

### Features:
- **GitHub User Validation**: Uses the GitHub API to verify if the provided username exists. If the user is not found, the server responds with a 404 error.
- **Dynamic View Count**: The view count for a user increments each time their profile is visited and is stored persistently in a local JSON file.
- **SVG Badge Generation**: The view count is displayed in an SVG badge. The badge can be customized by specifying a hex color code.
- **Customizable Badge Color**: Users can specify a hex color code for the badge (e.g., `#386de3`). If no valid color is provided, the default color `#386de3` will be used.

### Usage:

1. To run the application:
    ```bash
    npm install
    npm start
    ```

2. Access the application via the following URL:
    ```
    http://localhost:3000/{github_username}?color={hex_color}
    ```

    - Replace `{github_username}` with the GitHub username.
    - Optionally, replace `{hex_color}` with a valid hex color code for the badge (e.g., `386de3` for blue). If no color is specified or the color is invalid, the default color `#386de3` will be used.

    Example:
    ```
    http://localhost:3000/octocat?color=4c1
    ```

    If no color query is provided (using default color):
    ```
    http://localhost:3000/octocat
    ```

### GitHub API Integration:

The app uses the GitHub API to verify the existence of the provided username. If the username is valid, the view count is incremented and displayed in the SVG badge. If the user does not exist on GitHub, a 404 error is returned.

### Profile View Counter:
- The view count increases each time the profile is accessed.
- The view count is stored locally in a JSON file, ensuring persistence across visits.
- Users can customize the badge color by providing a valid hex color code in the URL.
- If no color is provided, the default color `#386de3` is used.
