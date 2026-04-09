function App() {
  return (
    <Router>
      <div className="App">
        <Header /> 
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/members" element={<MemberScreen />} />
            <Route path="/birthdays" element={<BirthdayScreen />} />
            <Route path="/albums" element={<AlbumScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}