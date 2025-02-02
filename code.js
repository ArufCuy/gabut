document.addEventListener("DOMContentLoaded", () => {
  getMessages();
  getUserEmail();
  loadMessage();
});

const token = localStorage.getItem("token");
if (!token) {
  alert("Anda belum login!");
  window.location.href = "https://mail.arufkuy.my.id";
}

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
    const avatarElement = document.querySelector(".mail-avatar span");

    if (avatarElement) {
      const firstLetter = userData.address.split("@")[0][0].toUpperCase();
      avatarElement.textContent = firstLetter;
    }
  } catch (error) {
    console.error("Error:", error);

    Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: "Gagal mengambil informasi akun.",
      showConfirmButton: false,
      timer: 3000,
      didClose: () => {
        location.reload();
      },
    });
  }
}

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

    messagesList.innerHTML = "";

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

      listItem.addEventListener("click", (event) => {
        event.preventDefault(); // Mencegah perubahan URL dan halaman reload
        document.body.classList.add("mailcontent-show"); // Menambahkan kelas
        loadMessage(message.id); // Memuat pesan tanpa memuat ulang halaman
      });

      messagesList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error:", error);

    Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: "Gagal mengambil pesan.",
      showConfirmButton: false,
      timer: 3000,
      didClose: () => {
        location.reload();
      },
    });
  }
}

// Event listener untuk avatar profile pengguna
document
  .getElementById("user-profile")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Mencegah default action (navigasi)

    try {
      // Mendapatkan data pengguna dari API (misalnya /me)
      const userResponse = await fetch("https://api.mail.tm/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Pastikan tokennya sudah benar
          "Content-Type": "application/json",
        },
      });

      if (!userResponse.ok) throw new Error("Gagal mengambil data pengguna");

      const userData = await userResponse.json();

      // Menampilkan informasi menggunakan SweetAlert
      Swal.fire({
        icon: "info",
        title: "Informasi Akun",
        html: `
        <p><strong>ID:</strong> ${userData.id}</p>
        <p><strong>Email:</strong> ${userData.address}</p>
        <p><strong>Storage:</strong> ${userData.quota / 1000000} Mb</p> 
        <p><strong>Used:</strong> ${(userData.used / 1000000).toFixed(
          2
        )} Mb</p> 
      `,
        confirmButtonText: "Tutup",
      });
    } catch (error) {
      console.error("Error mengambil data pengguna:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Gagal mengambil data pengguna.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  });

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

    Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: "Gagal mengambil informasi akun.",
      showConfirmButton: false,
      timer: 3000,
      didClose: () => {
        location.reload();
      },
    });
  }
}

async function loadMessage(messageId) {
  if (!messageId) return;

  try {
    const response = await fetch(`https://api.mail.tm/messages/${messageId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Gagal mengambil isi pesan");

    const message = await response.json();
    document.querySelector(".mailcontent-placeholder").classList.add("d-none");
    document.querySelector(".mailcontent-group").classList.remove("d-none");
    document.querySelector(".mailcontent-subject").classList.remove("d-none");

    document.querySelector(".mailcontent-subject h4").textContent =
      message.subject;
    document.querySelector(
      ".mailcontent-sender h6"
    ).innerHTML = `${message.from.name} <span>&lt;${message.from.address}&gt;</span>`;
    document.querySelector(
      ".mailcontent-sender p"
    ).textContent = `to: ${message.to.map((t) => t.address).join(", ")}`;
    document.querySelector(".mailcontent-time").textContent = new Date(
      message.createdAt
    ).toLocaleString();
    document.querySelector(".mailcontent-body").innerHTML =
      message.html || `<p>${message.text}</p>`;

    // Tombol hapus dengan ID sudah ada
    const deleteButton = document.getElementById("mail-Delete");
    if (deleteButton) {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        deleteMessage(messageId); // Panggil fungsi hapus pesan
      });
    }

    // Tombol download
    const downloadButton = document.getElementById("download-message");
    if (downloadButton) {
      downloadButton.addEventListener("click", async (event) => {
        event.preventDefault();

        // Tampilkan SweetAlert konfirmasi download
        const result = await Swal.fire({
          icon: "question",
          title: "Konfirmasi Download",
          text: "Apakah Anda yakin ingin mendownload pesan ini?",
          showCancelButton: true,
          confirmButtonText: "Download",
          cancelButtonText: "Batal",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          // Buat konten file untuk diunduh
          const messageContent = `
            Subject: ${message.subject}
            From: ${message.from.name || message.from.address}
            To: ${message.to.map((t) => t.address).join(", ")}
            Sent at: ${new Date(message.createdAt).toLocaleString()}
            
            ${message.html || message.text}
          `;

          // Buat file Blob dan link untuk download
          const blob = new Blob([messageContent], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${message.subject}.txt`; // Nama file sesuai dengan subject pesan
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          Swal.fire({
            icon: "success",
            title: "Berhasil Mendownload",
            text: "Pesan berhasil diunduh.",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          // Jika batal download
          Swal.fire({
            icon: "info",
            title: "Batal Download",
            text: "Pesan tidak diunduh.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengambil isi pesan.");
  }
}

async function deleteMessage(messageId) {
  try {
    // Menampilkan konfirmasi menggunakan SweetAlert
    const result = await Swal.fire({
      icon: "warning",
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus pesan ini?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      // Jika user mengkonfirmasi, kirim permintaan hapus pesan
      const response = await fetch(
        `https://api.mail.tm/messages/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Gagal menghapus pesan");

      Swal.fire({
        icon: "success",
        title: "Pesan Terhapus",
        text: "Pesan berhasil dihapus.",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        // Setelah 3 detik, refresh halaman
        location.reload();
      });
    } else {
      // Jika batal, tampilkan pesan info
      Swal.fire({
        icon: "info",
        title: "Batal Menghapus",
        text: "Pesan tidak dihapus.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: "Gagal menghapus pesan.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

document.getElementById("refreshButton")?.addEventListener("click", (event) => {
  event.preventDefault();
  getMessages();
});

document.getElementById("mailBack")?.addEventListener("click", (event) => {
  event.preventDefault();
  window.history.back();
});

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "https://mail.arufkuy.my.id";
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
