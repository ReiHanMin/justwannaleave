// App assembly
function App() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <StatStrip />
      <CountryCards />
      <MapSection />
      <Guides />
      <Stories />
      <EmailCapture />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
