<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Meta -->
    <meta name="description" content="" />
    <meta name="author" content="Themepixels" />

    <!-- Favicon -->
    <link
      rel="shortcut icon"
      type="image/x-icon"
      href="assets/img/favicon.png"
    />

    <title>Mail.Arufkuy</title>

    <!-- Vendor CSS -->
    <link href="lib/remixicon/fonts/remixicon.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Template CSS -->
    <link rel="stylesheet" href="assets/css/style.min.css" />
  </head>
  <body>
    <div class="sidebar">
      <div class="sidebar-header">
        <a href="" class="sidebar-logo"> Mail.<strong>Arufkuy</strong></a>
      </div>
      <!-- sidebar-header -->
      <div class="sidebar-body">
        <label class="sidebar-label">Mailboxes</label>
        <nav class="nav flex-column mb-5">
          <a href="" class="nav-link active"
            ><i class="ri-inbox-line"></i> <span>Inbox</span>
          </a>
          <a href="" id="logoutButton" class="nav-link"
            ><i class="ri-spam-2-line"></i> <span>Log Out</span></a
          >
        </nav>

        <label class="sidebar-label">Labels</label>
        <nav class="nav flex-column mb-5">
          <a
            href="https://discord.com/invite/CkmzkYXqZ5"
            class="nav-link"
            id="discordLink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-discord"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
              />
            </svg>
            <span>Discord</span>
          </a>
          <a href="https://www.arufkuy.my.id" class="nav-link" id="blogLink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-substack"
              viewBox="0 0 16 16"
            >
              <path
                d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"
              />
            </svg>
            <span>Arufkuy Blog</span>
          </a>
          <a href="https://mail.tm" class="nav-link" id="mailApiLink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-up-left-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm8.096 10.803L6 6.707v2.768a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5h3.975a.5.5 0 1 1 0 1H6.707l4.096 4.096a.5.5 0 1 1-.707.707"
              />
            </svg>
            <span>API By mail.tm</span>
          </a>
        </nav>
      </div>
      <!-- sidebar-body -->
    </div>
    <!-- sidebar -->

    <div class="mailbox">
      <div class="mailbox-header">
        <a href="#" class="mailbox-menu"><i class="ri-menu-2-fill"></i></a>
        <div class="mailbox-search">
          <i class="ri-search-line"></i>
          <input type="search" class="form-control" placeholder="Search mail" />
        </div>
        <!-- mailbox-search -->
        <a href="#" class="mail-avatar" id="user-profile"><span></span></a>
      </div>
      <!-- mailbox-header -->

      <div class="mailbox-option">
        <a id="refreshButton" class="nav-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-fill-check"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
            />
            <path
              d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"
            />
          </svg>
          <span>Loading...</span>
        </a>

        <div class="ms-auto d-flex">
          <a href="" class="pager">Refresh</a>
        </div>
      </div>
      <!-- mailbox-option -->
      <ul id="mailGroup" class="mail-group">
        <li class="mail-item">
          <div class="mail-avatar"></div>
          <div class="mail-item-body">
            <div class="d-flex align-items-center">
              <span class="mail-sender"></span>
              <span class="mail-time"></span>
            </div>
            <h6 class="mail-subject"><span></span></h6>
            <p class="mail-text"></p>
          </div>
          <!-- mail-item-body -->
        </li>
      </ul>
      <!-- mail-group -->
    </div>
    <!-- mailbox -->

    <div id="mailContent" class="mailcontent">
      <div class="mailcontent-subject d-none">
        <nav class="nav">
          <a id="mailBack" href="#" class="nav-link">
            <i class="aruf-dd">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </i>
          </a>

          <a
            href="#"
            id="mail-Delete"
            class="nav-link"
            data-bs-toggle="tooltip"
            title="Delete"
            data-bs-placement="left"
            ><i class="ri-delete-bin-5-line"></i
          ></a>
          <a
            href="#"
            class="nav-link"
            id="download-message"
            data-bs-toggle="tooltip"
            title="Download"
            data-bs-placement="left"
            ><i
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                class="bi bi-box-arrow-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"
                /></svg></i
          ></a>
        </nav>
        <h4></h4>
      </div>
      <!-- mailcontent-subject -->
      <div class="mailcontent-group d-none">
        <!-- mailcontent-item -->
        <div class="mailcontent-item">
          <div class="mailcontent-header">
            <div class="mail-avatar"><span class="bg-primary">m</span></div>
            <div class="mailcontent-sender">
              <h6>Themepixels <span>&lt;me@themepixels.me&gt;</span></h6>
              <p>to: Mary Johnson</p>
            </div>
            <!-- mail-sender -->
            <div class="mailcontent-time">
              11:15 AM<span> (3 hours ago)</span>
            </div>
          </div>
          <!-- mailcontent-header -->
          <div class="mailcontent-body">
            <p></p>
            <p></p>

            <div class="card card-mail mb-3">
              <div class="card-body">
                <h6 class="card-title"></h6>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <!-- card-body -->
            </div>
            <!-- card -->

            <p></p>

            <p><br /></p>

            <hr />

            <!-- attachment-group -->
          </div>
          <!-- mailcontent-body -->
        </div>
        <!-- mailcontent-item -->
      </div>
      <!-- mailcontent-group -->
      <div class="mailcontent-placeholder">
        <i class="ri-mail-send-line"></i>
        <h5>No email has been selected</h5>
      </div>
      <!-- mailcontent-placeholder -->
    </div>
    <!-- mailcontent -->

    <div class="backdrop"></div>
    <script src="lib/jquery/jquery.min.js"></script>
    <script src="lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="lib/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="code.js"></script>
    <script src="assets/js/script.js"></script>
  </body>
</html>
