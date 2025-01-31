document.addEventListener("DOMContentLoaded", () => {
  getMessages();
  getUserEmail(); // Panggil fungsi untuk menampilkan username pengguna
});

const token = localStorage.getItem("token");
if (!token) {
  alert("Anda belum login!");
  window.location.href = "https://mail.arufkuy.my.id"; // Redirect ke halaman login jika token tidak ditemukan
}

// Fungsi untuk mendapatkan informasi akun pengguna
async function getUserEmail() {
  try {
    const response = await fetch("https://api.mail.tm/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Gagal mengambil informasi akun");

    const userData = await response.json();
    const refreshButton = document.getElementById("refreshButton");
    const avatarElement = document.querySelector(".mail-avatar span"); // Mengambil elemen avatar

    if (refreshButton) {
      // Menampilkan alamat email lengkap (username + domain)
      refreshButton.querySelector("span").textContent = userData.address;
    }

    if (avatarElement) {
      // Ambil huruf pertama dari username untuk avatar
      const firstLetter = userData.address.split("@")[0][0].toUpperCase();
      avatarElement.textContent = firstLetter; // Set huruf pertama pada elemen avatar
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengambil informasi akun.");
  }
}

// Fungsi untuk mendapatkan daftar pesan
async function getMessages() {
  try {
    const response = await fetch("https://api.mail.tm/messages", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Gagal mengambil pesan");

    const data = await response.json();
    const messagesList = document.getElementById("mailGroup");

    if (!messagesList) {
      console.error("Elemen mailGroup tidak ditemukan!");
      return;
    }

    messagesList.innerHTML = ""; // Kosongkan sebelum menambah pesan baru

    // Menampilkan daftar pesan
    data["hydra:member"].forEach((message) => {
      const listItem = document.createElement("li");
      listItem.classList.add("mail-item");

      listItem.innerHTML = `
        <div class="mail-avatar">
          <span class="bg-primary">${
            message.from.name ? message.from.name[0].toUpperCase() : "?"
          }</span>
        </div>
        <div class="mail-item-body">
          <div class="d-flex align-items-center">
            <span class="mail-sender">${
              message.from.name || message.from.address
            }</span>
            <span class="mail-time">${new Date(
              message.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</span>
          </div>
          <h6 class="mail-subject">${message.subject}</h6>
          <p class="mail-text">${message.intro || "Tidak ada ringkasan."}</p>
        </div>
      `;

      listItem.addEventListener("click", () => {
        // Mengarahkan ke halaman message.html dengan query string messageid
        window.location.href = `message.html?messageid=${message.id}`;
      });

      messagesList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengambil pesan.");
  }
}

// Tombol Refresh untuk mengambil ulang pesan
document.getElementById("refreshButton")?.addEventListener("click", (event) => {
  event.preventDefault();
  getMessages(); // Ambil ulang pesan
});

// Tombol Log Out
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token"); // Hapus token login
    window.location.href = "https://mail.arufkuy.my.id"; // Redirect ke halaman login
  });
}

// Pastikan halaman sudah sepenuhnya dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Menambahkan event listener untuk link Discord
  const discordLink = document.getElementById("discordLink");
  if (discordLink) {
    discordLink.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah aksi default
      window.location.href = discordLink.href; // Menavigasi ke URL Discord
    });
  }

  // Menambahkan event listener untuk link Arufkuy Blog
  const blogLink = document.getElementById("blogLink");
  if (blogLink) {
    blogLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = blogLink.href; // Menavigasi ke URL Blog
    });
  }

  // Menambahkan event listener untuk link Mail API
  const mailApiLink = document.getElementById("mailApiLink");
  if (mailApiLink) {
    mailApiLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = mailApiLink.href; // Menavigasi ke URL API
    });
  }
});
