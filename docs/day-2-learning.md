# Day 2 Learning Documentation

## Name
Hassam Naveed

## Date
DD/MM/YYYY

---

# Day 2 Learning

## 1. What are React Hooks?

React Hooks are built-in functions that allow functional components to use React features such as state, lifecycle methods, context, and other functionality. Before Hooks, these features were only available in class components. Hooks make the code cleaner, easier to understand, and easier to reuse.

Some commonly used Hooks are:
- useState
- useEffect
- useContext
- useRef
- useMemo
- useCallback

---

# 2. useState

### What is it?

`useState` is a Hook used to store and update data inside a functional component.

### Why do we use it?

- Store user input
- Store API data
- Handle counters
- Manage UI states like loading and errors

### Basic Syntax

```jsx
const [state, setState] = useState(initialValue);
```

### Example

```jsx
const [count, setCount] = useState(0);
```

Whenever the state changes, React automatically updates the UI.

---

# 3. useEffect

### What is it?

`useEffect` is used to perform side effects after a component renders.

### Common Uses

- Calling APIs
- Fetching data
- Setting timers
- Adding event listeners
- Updating the page title

### Basic Syntax

```jsx
useEffect(() => {
    // code here
}, []);
```

---

# 4. Dependency Array

The dependency array tells React when the `useEffect` should run.

### Empty Dependency Array

```jsx
useEffect(() => {
    console.log("Runs only once");
}, []);
```

Runs only when the component first loads.

### Dependency Included

```jsx
useEffect(() => {
    console.log("Runs when search changes");
}, [search]);
```

Runs whenever the `search` value changes.

### No Dependency Array

```jsx
useEffect(() => {
    console.log("Runs after every render");
});
```

Runs after every render.

---

# 5. Cleanup Function

A cleanup function is used to remove or stop anything that was created inside `useEffect`.

Example:
- Clear timers
- Remove event listeners
- Cancel subscriptions

Example:

```jsx
useEffect(() => {

    const timer = setInterval(() => {
        console.log("Running");
    }, 1000);

    return () => {
        clearInterval(timer);
    };

}, []);
```

The cleanup function prevents memory leaks and unnecessary background processes.

---

# 6. useSearchParams

### What is it?

`useSearchParams` is a Next.js Hook used to read query parameters from the URL.

Example URL

```
/countries?search=pakistan
```

Reading the value

```jsx
const searchParams = useSearchParams();

const search = searchParams.get("search");
```

In this example, the value of `search` will be `"pakistan"`.

---

# 7. useRouter

### What is it?

`useRouter` is used for navigation between pages in a Next.js application.

Example

```jsx
const router = useRouter();

router.push("/countries");
```

Common Methods

- `push()` → Navigate to another page
- `replace()` → Replace current route
- `back()` → Go back to previous page

---

# 8. Route Params vs Search Params

## Route Params

Route parameters are part of the URL path.

Example

```
/countries/pakistan
```

Here:

```
pakistan
```

is the route parameter.

Used for:
- Dynamic pages
- Product IDs
- User profiles

Example

```jsx
params.country
```

---

## Search Params

Search parameters appear after the `?` symbol.

Example

```
/countries?search=pakistan
```

Here:

```
search=pakistan
```

is a search parameter.

Used for:
- Search
- Filters
- Sorting
- Pagination

Example

```jsx
searchParams.get("search")
```

---

# 9. APIs and Endpoints Used

During this task, data was fetched from external REST APIs (World Bank and Open-Meteo) rather than internal Next.js API routes. Examples of endpoints used:
worldbankapi -> "https://api.worldbank.org/v2/country?format=json&per_page=20";
  https://open-meteo.com/en/docs

# 10. Problems Faced and Solutions
1. I faced issue while working with api calling, i resolved this error by reading relevant documentation and use LLMs.
2. I faced issues while configuring the shadn library use for components which i resolved through the documentation.
3. I faced issue while working or implementing the hooks which i resolve by dosumentation and LLMs and video tutorial.