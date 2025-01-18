pub mod routes;
pub mod types;
pub mod handlers;
pub mod auth;

// Re-export route modules directly for convenience
pub use routes::*;

// Re-export common types
pub use types::ApiResponse;

// Re-export handler utilities
pub use handlers::{
    HandlerResult,
    ok_response,
    created_response,
    no_content_response,
    not_found_response,
    forbidden_response,
};

// Re-export auth module
pub use auth::*;

use actix_web::web;
use actix_cors::Cors;
use crate::api::routes::{mobile, property, transfer, user};

pub fn configure(cfg: &mut web::ServiceConfig) {
    // Configure CORS
    let cors = Cors::default()
        .allowed_origin("http://localhost:3000")  // Frontend dev server
        .allowed_origin("http://localhost:19006")  // React Native dev server
        .allowed_origin("capacitor://localhost")  // Mobile app
        .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
        .allowed_headers(vec!["Authorization", "Content-Type"])
        .supports_credentials();

    cfg.service(
        web::scope("/api")
            .wrap(cors)
            .configure(mobile::configure_routes)
            .configure(property::configure_routes)
            .configure(transfer::configure_routes)
            .configure(user::configure_routes)
    );
}
