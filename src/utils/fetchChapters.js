export default async function FetchChapters() {
    try {
        const response = await fetch('http://localhost:1337/api/chapters/1');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('There was a problem', error.message);
    }
}