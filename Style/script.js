// Index JS

      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const clock = document.getElementById("clock");
      const ampmEl = document.getElementById("ampm");
      const dateEl = document.getElementById("date");
      const weekdays = document.getElementById("weekdays");
      const autoMode = document.getElementById("autoMode");
      const manualTime = document.getElementById("manualTime");
      const manualDate = document.getElementById("manualDate");
      const toggleFormatBtn = document.getElementById("toggleFormat");
      const toggleTheme = document.getElementById("toggleTheme");

      let is12Hour = true;

      function updateClock() {
        let now;

        if (autoMode.checked) {
          const utc =
            new Date().getTime() + new Date().getTimezoneOffset() * 60000;
          now = new Date(utc + 6 * 60 * 60 * 1000); // BD Time
        } else {
          now = new Date();
          const datePart = manualDate.value;
          const timePart = manualTime.value;

          if (datePart) {
            const [year, month, day] = datePart.split("-");
            now.setFullYear(parseInt(year));
            now.setMonth(parseInt(month) - 1);
            now.setDate(parseInt(day));
          }

          if (timePart) {
            const [hour, minute] = timePart.split(":");
            now.setHours(parseInt(hour));
            now.setMinutes(parseInt(minute));
            now.setSeconds(0);
          }
        }

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        let ampm = "";

        if (is12Hour) {
          ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12;
          hours = hours ? hours : 12;
        }

        const displayHours = String(hours).padStart(2, "0");
        clock.firstChild.textContent = `${displayHours}:${minutes}:${seconds}`;
        ampmEl.textContent = is12Hour ? ampm : "";

        const dateOptions = { year: "numeric", month: "long", day: "numeric" };
        dateEl.textContent = `Date: ${now.toLocaleDateString(
          "en-US",
          dateOptions
        )}`;

        const currentDay = now.getDay();
        weekdays.innerHTML = "";
        dayNames.forEach((day, index) => {
          const div = document.createElement("div");
          div.classList.add("day");
          if (index === currentDay) {
            div.classList.add("today");
          }
          div.textContent = day;
          weekdays.appendChild(div);
        });
      }

      autoMode.addEventListener("change", () => {
        const isAuto = autoMode.checked;
        manualTime.disabled = isAuto;
        manualDate.disabled = isAuto;
      });

      toggleFormatBtn.addEventListener("click", () => {
        is12Hour = !is12Hour;
        toggleFormatBtn.textContent = is12Hour ? "On" : "Off";
        toggleFormatBtn.classList.toggle("on", is12Hour);
        toggleFormatBtn.classList.toggle("off", !is12Hour);
      });

      toggleTheme.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
          toggleTheme.textContent = "Dark Mode";
        } else {
          toggleTheme.textContent = "Light Mode";
        }
      });

      setInterval(updateClock, 1000);
      updateClock();


    //   Alarm JS

    